import { DEFAULT_PAGE_SIZE } from '../constants/nhanVienConstants';

export const EMPTY_FILTER = {
  maNv: '',
  tenNv: '',
  chucVu: '',
  email: '',
};

export function hasActiveFilter(filter) {
  if (!filter || typeof filter !== 'object') return false;
  return Boolean(
    (filter.maNv && filter.maNv.trim()) ||
    (filter.tenNv && filter.tenNv.trim()) ||
    (filter.chucVu && filter.chucVu.trim()) ||
    (filter.email && filter.email.trim()),
  );
}

export function buildNhanVienParams(filter, page = 0, size = DEFAULT_PAGE_SIZE) {
  const params = {
    page,
    size,
  };

  if (filter?.maNv && filter.maNv.trim()) {
    params.maNv = filter.maNv.trim();
  }
  if (filter?.tenNv && filter.tenNv.trim()) {
    params.tenNv = filter.tenNv.trim();
  }
  if (filter?.chucVu && filter.chucVu.trim()) {
    params.chucVu = filter.chucVu.trim();
  }
  if (filter?.email && filter.email.trim()) {
    params.email = filter.email.trim();
  }

  return params;
}
