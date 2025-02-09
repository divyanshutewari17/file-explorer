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
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; options: { label: string; action: () => void }[] } | null>(null);

  // Drop Target to accept folders
  const [, drop] = useDrop(() => ({
    accept: 'FOLDER',
    drop: (item: { id: string }) => {
      // Dispatch action to move folder
      dispatch(moveFolder({ id: item.id, newParentId: null }));
    },
  }));

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      options: [
        {
          label: 'New Folder',
          action: () => {
            dispatch(addFolder({ id: Date.now().toString(), name: 'New Folder', parentId: null, children: [] }));
            setContextMenu(null);
          },
        },
      ],
    });
  };

const dropRef = useRef<HTMLDivElement>(null);
drop(dropRef);

  return (
    <div ref={dropRef} onContextMenu={handleRightClick}>
      {folders.map((folder) => (
        <Folder key={folder.id} folder={folder} />
      ))}
      {contextMenu && <ContextMenu x={contextMenu.x} y={contextMenu.y} options={contextMenu.options} />}
    </div>
  );
};

export default App;
