import styled from 'styled-components';

export const ContextMenuContainer = styled.div`
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

export const ContextMenuItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;