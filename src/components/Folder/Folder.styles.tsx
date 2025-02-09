import styled from 'styled-components';

interface FolderContainerProps {
  $isDragging: boolean;
}

const FolderContainer = styled.div<FolderContainerProps>`
  width: 100px; /* Icon size similar to macOS */
  height: 120px; /* Maintain proportion */
  padding: 10px;
  margin: 10px;
  border-radius: 8px;
  background-color: ${(props) => (props.$isDragging ? '#f0f0f0' : '#fff')};
  cursor: move;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: ${(props) => (props.$isDragging ? '0px 0px 10px rgba(0,0,0,0.2)' : 'none')};

  &:hover {
    background-color: #e6e6e6;
  }
`;

export default FolderContainer

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
