import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/store';
import { addFolder, moveFolder } from './store/slices/folderSlice';
import Folder from './components/Folder/Folder';
import ContextMenu from './components/ContextMenu/ContextMenu';
import { useDrop } from 'react-dnd';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const folders = useSelector((state: RootState) => state.folders.folders);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    options: { label: string; action: () => void }[];
  } | null>(null);

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      options: [
        {
          label: 'New Folder',
          action: () => {
            const folderNames = folders.map((folder) => folder.name);
            const baseName = 'New Folder';
            let newFolderName = baseName;
            let count = 0;

            while (folderNames.includes(newFolderName)) {
              count++;
              newFolderName = `${baseName} ${count}`;
            }

            dispatch(addFolder({ id: Date.now().toString(), name: newFolderName, parentId: null, children: [] }));
            setContextMenu(null);
          },
        },
      ],
    });
  };

  return (
    <div onContextMenu={handleRightClick} style={{ width: '100vw', height: '100vh', position: 'relative', display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
      {folders.map((folder) => (
        <Folder key={folder.id} folder={folder} />
      ))}
      {contextMenu && <ContextMenu x={contextMenu.x} y={contextMenu.y} options={contextMenu.options} />}
    </div>
  );
};


export default App;
