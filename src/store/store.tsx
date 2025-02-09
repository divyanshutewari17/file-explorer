import { configureStore } from '@reduxjs/toolkit';
import folderReducer from './slices/folderSlice';

export const store = configureStore({
  reducer: {
    folders: folderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;