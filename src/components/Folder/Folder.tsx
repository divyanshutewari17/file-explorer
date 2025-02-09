import React, { useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { deleteFolder, updateFolderName, updateFolderPosition } from "../../store/slices/folderSlice";
import FolderContainer, { FolderName, FolderIcon } from "./Folder.styles";
import { Folder as FolderType } from "../../types";
import { FaFolder } from "react-icons/fa";

interface FolderProps {
  folder: FolderType;
  onRightClick: (event: React.MouseEvent, folderId: string) => void;
  isSelected: boolean;
}

const Folder: React.FC<FolderProps> = ({ folder, onRightClick, isSelected }) => {
  const dispatch = useDispatch();
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState(folder.name);
  const ref = useRef<HTMLDivElement>(null);

  // Drag logic
  const [{ isDragging }, drag] = useDrag({
    type: "FOLDER",
    item: { id: folder.id, x: folder.x, y: folder.y },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta) {
        const x = Math.round(item.x + delta.x);
        const y = Math.round(item.y + delta.y);

        // Prevent dragging over the sidebar
        const sidebarWidth = 200; // Width of the sidebar
        if (x >= sidebarWidth) {
          dispatch(updateFolderPosition({ id: folder.id, x, y }));
        }
      }
    },
  });

  // Drop logic
  const [, drop] = useDrop({
    accept: "FOLDER",
    hover: (draggedFolder: { id: string }) => {
      if (draggedFolder.id !== folder.id) {
        // Handle folder movement logic if needed
      }
    },
  });

  drag(drop(ref));

  const handleRename = () => {
    if (newName.trim()) {
      dispatch(updateFolderName({ id: folder.id, name: newName }));
      setIsRenaming(false);
    }
  };

  return (
    <FolderContainer
      ref={ref}
      $isDragging={isDragging}
      style={{ left: folder.x, top: folder.y, position: "absolute" }}
      onContextMenu={(e) => onRightClick(e, folder.id)}
      isSelected={isSelected}
    >
      <FolderIcon>
        <FaFolder />
      </FolderIcon>
      {isRenaming ? (
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onBlur={handleRename}
          onKeyDown={(e) => e.key === "Enter" && handleRename()}
          autoFocus
        />
      ) : (
        <FolderName onDoubleClick={() => setIsRenaming(true)}>{folder.name}</FolderName>
      )}
    </FolderContainer>
  );
};

export default Folder;