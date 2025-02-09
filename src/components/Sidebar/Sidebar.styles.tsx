import styled from "styled-components";

export const SidebarContainer = styled.div`
  width: 200px; // Fixed width for the sidebar
  height: 100vh;
  background-color: #2d2d2d; // Dark sidebar background
  color: #ffffff; // Light text color
  padding: 16px;
  box-sizing: border-box;
  border-right: 1px solid #444; // Subtle border for separation
`;

export const SidebarHeader = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #ffffff;
`;

export const SidebarItem = styled.div`
  padding: 8px;
  margin: 4px 0;
  border-radius: 4px;
  cursor: pointer;
  color: #ffffff;
  &:hover {
    background-color: #444; // Hover effect
  }
`;