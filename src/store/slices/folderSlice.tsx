import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Folder } from "../../types";

interface FolderState {
  folders: Folder[];
}

const initialState: FolderState = {
  folders: [{
    children: [],
    id: "1439120427290",
    name: "My Folder",
    parentId: null,
    x: 200, // Initial x position
    y: 0, // Initial y position
  }],
};

const folderSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    addFolder: (state, action: PayloadAction<Folder>) => {
      state.folders.push(action.payload);
    },
    deleteFolder: (state, action: PayloadAction<string>) => {
      state.folders = state.folders.filter((folder) => folder.id !== action.payload);
    },
    updateFolderName: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const folder = state.folders.find((f) => f.id === action.payload.id);
      if (folder) {
        folder.name = action.payload.name;
      }
    },
    updateFolderPosition: (state, action: PayloadAction<{ id: string; x: number; y: number }>) => {
      const folder = state.folders.find((f) => f.id === action.payload.id);
      if (folder) {
        folder.x = action.payload.x;
        folder.y = action.payload.y;
      }
    },
  },
});

export const { addFolder, deleteFolder, updateFolderName, updateFolderPosition } = folderSlice.actions;
export default folderSlice.reducer;