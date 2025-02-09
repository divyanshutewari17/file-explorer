import React, { useState, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { deleteFolder, updateFolderName } from '../../store/slices/folderSlice';
import FolderContainer, { FolderName } from './Folder.styles';
import { Folder as FolderType } from '../../types';

interface FolderProps {
  folder: FolderType;
}

const Folder: React.FC<FolderProps> = ({ folder }) => {
  const dispatch = useDispatch();
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(folder.name);
  const ref = useRef<HTMLDivElement>(null);

  // Use the useDrag hook to make the folder draggable
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'FOLDER', // Define the type of draggable item
    item: { id: folder.id }, // Data to be passed to the drop target
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(), // Track whether the folder is being dragged
    }),
  }));

  // Assign the drag function to the ref
  drag(ref);

  // Handle folder deletion
  const handleDelete = () => {
    dispatch(deleteFolder(folder.id));
  };

  // Handle folder renaming
  const handleRename = () => {
    if (newName.trim()) {
      dispatch(updateFolderName({ id: folder.id, name: newName }));
      setIsRenaming(false);
    }
  };

  return (
    <FolderContainer ref={ref} $isDragging={isDragging}>
      {isRenaming ? (
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onBlur={handleRename}
          autoFocus
        />
      ) : (
        <FolderName onDoubleClick={() => setIsRenaming(true)}>{folder.name}</FolderName>
      )}
      <button onClick={handleDelete}>Delete</button>
    </FolderContainer>
  );
};

export default Folder;
