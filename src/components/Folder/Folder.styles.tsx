import styled from "styled-components";

interface FolderContainerProps {
  $isDragging?: boolean;
  isSelected?: boolean;
  x?: number;
  y?: number
}

const FolderContainer = styled.div<FolderContainerProps>`
  width: 100px;
  height: 120px;
  padding: 10px;
  margin: 15px;
  border-radius: 8px;
  background-color: ${(props) => (props.$isDragging || props.isSelected ? "#444" : "#333")};
  color: #ffffff;
  cursor: move;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: ${(props) => (props.$isDragging ? "0px 0px 10px rgba(255,255,255,0.2)" : "none")};
  position: absolute;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;

  &:hover {
    background-color: #555; // Hover effect
  }
`;


export default FolderContainer;

export const FolderIcon = styled.div`
  width: 60px;
  height: 60px;
  background-color: #f3c623;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
`;

export const FolderName = styled.span`
  font-size: 14px;
  font-weight: bold;
  margin-top: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

export const Canvas = styled.div`
  position: flex;
  width: 100%;
  height: 100vh;
  background-color: #1e1e1e;
  color: #ffffff;
  overflow: hidden;
`;