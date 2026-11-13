import { NHU_CAU_PAGE_SIZE } from '../constants/nhuCauOptions';

const DIEN_TICH_PATTERN = /^\d{1,8}([.,]\d{1,2})?$/;

export const DIEN_TICH_ERROR = 'Diện tích không hợp lệ';

export const EMPTY_FILTER = {
  loaiBds: '',
  viTri: '',
  dienTich: '',
};

export function normalizeDienTich(value) {
  const text = String(value ?? '').trim();
  if (!text) return '';
  if (!DIEN_TICH_PATTERN.test(text)) return null;
  const number = Number(text.replace(',', '.'));
  return number > 0 ? String(number) : null;
}

export function hasActiveFilter(filter) {
  return Boolean(filter.loaiBds || filter.viTri || filter.dienTich);
}

export function buildNhuCauParams(filter, page) {
  const params = { page, size: NHU_CAU_PAGE_SIZE };
  if (filter.loaiBds) params.loaiBds = filter.loaiBds;
  if (filter.viTri) params.viTri = filter.viTri;
  if (filter.dienTich) params.dienTich = filter.dienTich;
  return params;
}

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
