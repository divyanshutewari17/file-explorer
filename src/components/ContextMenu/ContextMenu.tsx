import React from "react";
import { ContextMenuContainer, ContextMenuItem } from "./ContextMenu.styles";

interface ContextMenuProps {
  x: number;
  y: number;
  options: { label: string; action: () => void }[];
  onClose: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, options, onClose }) => {
  return (
    <ContextMenuContainer style={{ left: x, top: y }}>
      {options.map((option, index) => (
        <ContextMenuItem key={index} onClick={option.action}>
          {option.label}
        </ContextMenuItem>
      ))}
    </ContextMenuContainer>
  );
};

export default ContextMenu;