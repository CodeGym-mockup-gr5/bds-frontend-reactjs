export function getPageItems(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index);
  }
  const start = Math.max(1, Math.min(currentPage - 1, totalPages - 4));
  const end = Math.min(totalPages - 2, Math.max(currentPage + 1, 3));
  const middle = Array.from({ length: end - start + 1 }, (_, index) => start + index);
  return [
    0,
    ...(start > 1 ? ['gap-start'] : []),
    ...middle,
    ...(end < totalPages - 2 ? ['gap-end'] : []),
    totalPages - 1,
  ];
}

export function getRangeText(page, size, itemCount, totalElements) {
  if (totalElements === 0 || itemCount === 0) return '';
  const from = page * size + 1;
  const to = page * size + itemCount;
  return `Hiển thị ${from}–${to} trong ${totalElements} thông báo`;
}
