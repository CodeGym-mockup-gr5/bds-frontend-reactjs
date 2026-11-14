export const ADMIN_MENU_ITEMS = [
  {
    key: 'nhan-vien',
    label: 'Nhân viên',
    to: '/admin/nhan-vien',
    icon: 'users',
    matchPaths: ['/admin/nhan-vien', '/nhan-vien', '/admin'],
  },
  {
    key: 'thong-bao',
    label: 'Thông báo',
    to: '/admin/thong-bao',
    icon: 'bell',
    matchPaths: ['/admin/thong-bao'],
  },
  {
    key: 'khach-hang',
    label: 'Khách hàng',
    to: '/admin/khach-hang',
    icon: 'user',
    matchPaths: ['/admin/khach-hang'],
  },
  {
    key: 'bat-dong-san',
    label: 'Bất động sản',
    to: '/admin/bat-dong-san',
    icon: 'home',
    matchPaths: ['/admin/bat-dong-san'],
  },
  {
    key: 'nhu-cau',
    label: 'Nhu cầu',
    to: '/admin/nhu-cau',
    icon: 'search',
    matchPaths: ['/admin/nhu-cau'],
  },
  {
    key: 'giao-dich',
    label: 'Giao dịch',
    to: '/admin/giao-dich',
    icon: 'exchange',
    matchPaths: ['/admin/giao-dich'],
  },
  {
    key: 'bieu-mau',
    label: 'Hỗ trợ biểu mẫu',
    to: '/admin/bieu-mau',
    icon: 'document',
    matchPaths: ['/admin/bieu-mau'],
  },
  {
    key: 'thong-ke',
    label: 'Thống kê',
    to: '/admin/thong-ke',
    icon: 'chart',
    matchPaths: ['/admin/thong-ke'],
  },
];

export function isAdminMenuItemActive(item, pathname) {
  if (!item || !pathname) return false;
  const current = pathname.replace(/\/+$/, '') || '/';
  if (item.to && current === item.to.replace(/\/+$/, '')) {
    return true;
  }
  if (!Array.isArray(item.matchPaths)) return false;
  return item.matchPaths.some((path) => {
    const cleanPath = path.replace(/\/+$/, '') || '/';
    if (cleanPath === '/admin') {
      return current === '/admin';
    }
    return current === cleanPath || current.startsWith(`${cleanPath}/`);
  });
}
