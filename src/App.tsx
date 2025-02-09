import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Folder from "./components/Folder/Folder";
import ContextMenu from "./components/ContextMenu/ContextMenu";
import { addFolder, deleteFolder, updateFolderName } from "./store/slices/folderSlice";
import FolderContainer, { FolderIcon } from "./components/Folder/Folder.styles";
import { FaFolder } from "react-icons/fa";
import { useRef } from "react";

const App: React.FC = () => {
  const folders = useSelector((state) => (state as any)?.folders?.folders || []);
  const dispatch = useDispatch();
  const [contextMenu, setContextMenu] = useState(null);
  const [editingFolderId, setEditingFolderId] = useState<string | null>(null);
  const [newFolderName, setNewFolderName] = useState<string>("");
  const ref = useRef<HTMLDivElement>(null)

  const handleRenameStart = (folderId: string, currentName: string) => {
    setEditingFolderId(folderId);
    setNewFolderName(currentName);
    setContextMenu(null); // Close context menu when renaming starts
  };

  const handleRenameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFolderName(e.target.value);
  };

  const handleRenameSubmit = () => {
    if (editingFolderId && newFolderName.trim()) {
      dispatch(updateFolderName({ id: editingFolderId, name: newFolderName }));
    }
    setEditingFolderId(null);
  };

  const handleRightClick = (e: React.MouseEvent, folderId?: string, folderName?: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (folderId) {
      setContextMenu({
        x: e.clientX,
        y: e.clientY,
        options: [
          { label: "Rename", action: () => handleRenameStart(folderId, folderName || "New Folder") },
          { label: "Delete", action: () => dispatch(deleteFolder(folderId)) },
        ],
      });
    } else {
      setContextMenu({
        x: e.clientX,
        y: e.clientY,
        options: [
          {
            label: "New Folder",
            action: () => {
              const folderNames = folders.map(folder => folder.name);
              const baseName = "New Folder";
              let newFolderName = baseName;

              let count = 0;
              while (folderNames.includes(newFolderName)) {
                count++;
                newFolderName = `${baseName} ${count}`;
              }

              dispatch(addFolder({ 
                id: Date.now().toString(), 
                name: newFolderName, 
                parentId: null, 
                children: [] 
              }));

              setContextMenu(null);
            },
          }
        ],
      });
    }
  };

  return (
    <div
      onContextMenu={(e) => handleRightClick(e)}
      onClick={() => setContextMenu(null)}
      style={{ 
        width: '100vw', 
        height: '100vh', 
        position: 'relative', 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', 
        gap: '16px', 
        padding: '20px',
        justifyContent: 'center',
        alignContent: 'start'
      }}
    >
      {folders.map((folder) => (
        <div key={folder.id} onContextMenu={(e) => handleRightClick(e, folder.id, folder.name)}>
          {editingFolderId === folder.id ? (
            <FolderContainer ref={ref} >
              <FolderIcon>
                <FaFolder />
              </FolderIcon>
              <input
                type="text"
                value={newFolderName}
                onChange={handleRenameChange}
                onBlur={handleRenameSubmit}
                onKeyDown={(e) => e.key === "Enter" && handleRenameSubmit()}
                autoFocus
              />
            </FolderContainer>
          ) : (
            <Folder folder={folder} onRightClick= {handleRightClick}/>
          )}
        </div>
      ))}

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          options={contextMenu.options}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
  );
};

export default App;
