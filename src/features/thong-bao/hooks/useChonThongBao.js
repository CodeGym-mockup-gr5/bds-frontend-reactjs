import { useCallback, useState } from 'react';

export default function useChonThongBao(items) {
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleOne = useCallback((id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  }, []);

  const toggleAll = useCallback(() => {
    const pageIds = items.map((item) => item.id);
    setSelectedIds((prev) => (pageIds.every((id) => prev.includes(id)) ? [] : pageIds));
  }, [items]);

  const clearSelection = useCallback(() => setSelectedIds([]), []);

  return { selectedIds, toggleOne, toggleAll, clearSelection };
}
