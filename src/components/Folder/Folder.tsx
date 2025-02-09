import React, { useState, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { deleteFolder, moveFolder, updateFolderName } from '../../store/slices/folderSlice';
import FolderContainer,{ FolderName, FolderIcon } from './Folder.styles';
import { Folder as FolderType } from '../../types';
import {FaFolder} from 'react-icons/fa'; // Folder icon

interface FolderProps {
  folder: FolderType;
}

const Folder: React.FC<FolderProps> = ({ folder }) => {
  const dispatch = useDispatch();
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(folder.name);
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: "FOLDER",
    item: { id: folder.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  /** 📌 Dropping Logic */
  const [, drop] = useDrop({
    accept: "FOLDER",
    drop: (draggedFolder: { id: string }) => {
      if (draggedFolder.id !== folder.id) {
        dispatch(moveFolder({ fromId: draggedFolder.id, toId: folder.id }));
      }
    },
  });

  drag(drop(ref));

  const handleDelete = () => {
    dispatch(deleteFolder(folder.id));
  };

  const handleRename = () => {
    if (newName.trim()) {
      dispatch(updateFolderName({ id: folder.id, name: newName }));
      setIsRenaming(false);
    }
  };

  return (
    <FolderContainer ref={ref} $isDragging={isDragging}>
      <FolderIcon>
        <FaFolder />
      </FolderIcon>
      {isRenaming ? (
        <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} onBlur={handleRename} autoFocus />
      ) : (
        <FolderName onDoubleClick={() => setIsRenaming(true)}>{folder.name}</FolderName>
      )}
      <button onClick={handleDelete}>Delete</button>
    </FolderContainer>
  );
};

export default Folder;
