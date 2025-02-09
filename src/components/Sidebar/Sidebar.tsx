import React from "react";
import { SidebarContainer, SidebarHeader, SidebarItem } from "./Sidebar.styles";

interface SidebarProps {
  folders: any[];
  selectedFolder: string | null;
  onSelectFolder: (folderId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ folders, selectedFolder, onSelectFolder }) => {
  return (
    <SidebarContainer>
      <SidebarHeader>Folders</SidebarHeader>
      {folders.map((folder) => (
        <SidebarItem
          key={folder.id}
          onClick={() => onSelectFolder(folder.id)}
          style={{
            backgroundColor: selectedFolder === folder.id ? "#555" : "transparent", // Highlight selected folder
          }}
        >
          {folder.name}
        </SidebarItem>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;