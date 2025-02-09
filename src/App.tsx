import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Folder from "./components/Folder/Folder";
import Sidebar from "./components/Sidebar/Sidebar";
import ContextMenu from "./components/ContextMenu/ContextMenu";
import { addFolder, deleteFolder, updateFolderName } from "./store/slices/folderSlice";

const App: React.FC = () => {
  const folders = useSelector((state) => (state as any)?.folders?.folders || []);
  const dispatch = useDispatch();
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const renameFolder = (folderId: string) => {
    setSelectedFolder(folderId);
  };

  const handleRightClick = (e: React.MouseEvent, folderId?: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (folderId) {
      setContextMenu({
        x: e.clientX,
        y: e.clientY,
        options: [
          { label: "Rename", action: () => renameFolder(folderId) },
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
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      
      {/* Sidebar Component */}
      <Sidebar 
        folders={folders} 
        selectedFolder={selectedFolder} 
        onSelectFolder={setSelectedFolder} 
      />

      {/* Main Grid View */}
      <div
        onContextMenu={(e) => handleRightClick(e)} 
        onClick={() => setContextMenu(null)} 
        style={{ 
          flex: 1, 
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", 
          gap: "16px", 
          padding: "20px",
          justifyContent: "center",
          alignContent: "start",
        }}
      >
        {folders.map((folder) => (
          <Folder key={folder.id} folder={folder} onRightClick={handleRightClick} isSelected={selectedFolder === folder.id} />
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
    </div>
  );
};

export default App;
