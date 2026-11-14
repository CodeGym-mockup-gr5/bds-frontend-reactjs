import { useEffect } from 'react';

export function isFileDrag(event) {
  return Array.from(event.dataTransfer?.types || []).includes('Files');
}

export default function useWindowFileDropGuard() {
  useEffect(() => {
    const handleDragOver = (event) => {
      if (event.defaultPrevented || !isFileDrag(event)) return;
      event.preventDefault();
      const { dataTransfer } = event;
      dataTransfer.dropEffect = 'none';
    };
    const handleDrop = (event) => {
      if (event.defaultPrevented || !isFileDrag(event)) return;
      event.preventDefault();
    };

    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('drop', handleDrop);
    return () => {
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('drop', handleDrop);
    };
  }, []);
}
