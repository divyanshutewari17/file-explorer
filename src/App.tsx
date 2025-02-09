import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Folder from "./components/Folder/Folder";
import Sidebar from "./components/Sidebar/Sidebar";
import ContextMenu from "./components/ContextMenu/ContextMenu";
import { addFolder, deleteFolder, updateFolderName } from "./store/slices/folderSlice";
import { Canvas } from "./components/Folder/Folder.styles";

const App: React.FC = () => {
  const folders = useSelector((state) => (state as any)?.folders?.folders || []);
  const dispatch = useDispatch();
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; options: { label: string; action: () => void }[] } | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const handleRightClick = (e: React.MouseEvent, folderId?: string) => {
    e.preventDefault();
    e.stopPropagation();

    const x = e.clientX;
    const y = e.clientY;

    if (folderId) {
      setContextMenu({
        x,
        y,
        options: [
          { label: "Rename", action: () => setSelectedFolder(folderId) },
          { label: "Delete", action: () => dispatch(deleteFolder(folderId)) },
        ],
      });
    } else {
      setContextMenu({
        x,
        y,
        options: [
          {
            label: "New Folder",
            action: () => {
              const folderNames = folders.map((folder) => folder.name);
              const baseName = "New Folder";
              let newFolderName = baseName;

              let count = 0;
              while (folderNames.includes(newFolderName)) {
                count++;
                newFolderName = `${baseName} ${count}`;
              }

              dispatch(
                addFolder({
                  id: Date.now().toString(),
                  name: newFolderName,
                  parentId: null,
                  children: [],
                  x: e.clientX,
                  y: e.clientY,
                })
              );

              setContextMenu(null);
            },
          },
        ],
      });
    }
  };

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh", backgroundColor: "#1e1e1e" }}>
      {/* Sidebar Component */}
      <Sidebar
        folders={folders}
        selectedFolder={selectedFolder}
        onSelectFolder={setSelectedFolder}
      />

      {/* Main Canvas */}
      <Canvas
        onContextMenu={(e) => handleRightClick(e)}
        onClick={() => setContextMenu(null)}
      >
        {folders.map((folder) => (
          <Folder
            key={folder.id}
            folder={folder}
            onRightClick={handleRightClick}
            isSelected={selectedFolder === folder.id}
          />
        ))}

        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            options={contextMenu.options}
            onClose={() => setContextMenu(null)}
          />
        )}
      </Canvas>
    </div>
  );
};

export default App;