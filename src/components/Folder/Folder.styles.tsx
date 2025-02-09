import styled from 'styled-components';

interface FolderContainerProps {
  $isDragging: boolean;
}

const FolderContainer = styled.div<FolderContainerProps>`
  padding: 10px;
  margin: 5px;
  border: 1px solid #ccc;
  background-color: ${(props) => (props.$isDragging ? '#f0f0f0' : '#fff')};
  cursor: move;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export default FolderContainer;

export const FolderName = styled.span`
  font-size: 16px;
  font-weight: bold;
`;
