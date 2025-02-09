export interface Folder {
    id: string;
    name: string;
    parentId: string | null;
    children: Folder[];
    x?: number;
    y?:number
  }
  
  export interface FolderState {
    folders: Folder[];
  }
  
  export type ContextMenuOption = {
    label: string;
    action: () => void;
  };