export const ACCOUNT_MENU_ACTIONS = {
  LOGOUT: 'logout',
};

export const ACCOUNT_MENU_ITEMS = [
  {
    key: 'tin-dang-cua-toi',
    label: 'Tin đăng của tôi',
    icon: 'posts',
    to: '/tin-dang-cua-toi',
    matchPaths: ['/tin-dang-cua-toi', '/nhu-cau-cua-toi'],
  },
  {
    key: 'thong-tin-ca-nhan',
    label: 'Thông tin cá nhân',
    icon: 'profile',
    to: '/thong-tin-ca-nhan',
    matchPaths: ['/thong-tin-ca-nhan'],
  },
  {
    key: 'doi-mat-khau',
    label: 'Đổi mật khẩu',
    icon: 'password',
    to: '/doi-mat-khau',
    matchPaths: ['/doi-mat-khau'],
  },
  {
    key: 'dang-xuat',
    label: 'Đăng xuất',
    icon: 'logout',
    action: ACCOUNT_MENU_ACTIONS.LOGOUT,
  },
];

export function isAccountMenuItemActive(item, pathname) {
  if (!Array.isArray(item.matchPaths)) return false;
  return item.matchPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`));
}
