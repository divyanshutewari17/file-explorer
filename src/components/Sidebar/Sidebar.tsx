import React from "react";

interface SidebarProps {
  folders: { id: string; name: string }[];
  selectedFolder: string | null;
  onSelectFolder: (folderId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ folders, selectedFolder, onSelectFolder }) => {
  return (
    <div
      style={{
        width: "13rem",
        background: "#f5f5f7",
        padding: "10px",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
        overflowY: "auto",
        height: "100vh",
      }}
    >
      <h3 style={{ paddingLeft: "10px" }}>📂 Folders</h3>
      {folders.map((folder) => (
        <div
          key={folder.id}
          onClick={() => onSelectFolder(folder.id)}
          style={{
            padding: "8px 15px",
            margin: "5px 0",
            cursor: "pointer",
            background: selectedFolder === folder.id ? "#d0d3d6" : "transparent",
            borderRadius: "5px",
          }}
        >
          {folder.name}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
