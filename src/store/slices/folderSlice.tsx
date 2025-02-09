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
    parentId: null
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
    /** 📌 New reducer to handle folder movement */
    moveFolder: (state, action: PayloadAction<{ fromId: string; toId: string }>) => {
      const { fromId, toId } = action.payload;
      const fromIndex = state.folders.findIndex((f) => f.id === fromId);
      const toIndex = state.folders.findIndex((f) => f.id === toId);

      if (fromIndex !== -1 && toIndex !== -1) {
        const [movedFolder] = state.folders.splice(fromIndex, 1);
        state.folders.splice(toIndex, 0, movedFolder);
      }
    },
  },
});

export const { addFolder, deleteFolder, updateFolderName, moveFolder } = folderSlice.actions;
export default folderSlice.reducer;
