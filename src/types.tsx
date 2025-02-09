export interface Folder {
    id: string;
    name: string;
    parentId: string | null;
    children: Folder[];
  }
  
  export interface FolderState {
    folders: Folder[];
  }
  
  export type ContextMenuOption = {
    label: string;
    action: () => void;
  };