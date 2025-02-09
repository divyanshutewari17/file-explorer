import styled from "styled-components";

export const ContextMenuContainer = styled.div`
  position: absolute;
  background-color: #2d2d2d; // Dark background color
  border: 1px solid #444; // Subtle border
  border-radius: 6px; // Rounded corners
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); // Shadow for depth
  z-index: 1000;
  padding: 8px 0;
  min-width: 150px;
`;

export const ContextMenuItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;
  color: #ffffff; // Light text color
  font-size: 14px;
  &:hover {
    background-color: #444; // Hover effect
  }
`;