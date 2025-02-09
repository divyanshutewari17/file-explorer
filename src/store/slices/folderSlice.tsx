import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Folder, FolderState } from '../../types';

const initialState: FolderState = {
  folders: [],
};

const folderSlice = createSlice({
  name: 'folders',
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
    moveFolder: (state, action: PayloadAction<{ id: string; newParentId: string | null }>) => {
      const folder = state.folders.find(folder => folder.id === action.payload.id);
      if (folder) {
        folder.parentId = action.payload.newParentId;
      }
    },
  },
});

export const { addFolder, deleteFolder, updateFolderName, moveFolder } = folderSlice.actions;
export default folderSlice.reducer;