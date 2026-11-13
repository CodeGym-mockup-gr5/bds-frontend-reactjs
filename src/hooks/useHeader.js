import useAuth from './useAuth';

const MENU_ITEMS = [
  { nhan: 'Mua bán', duongDan: '/bat-dong-san' },
  { nhan: 'Dự án', duongDan: '/du-an' },
  { nhan: 'Hỗ trợ', duongDan: '/ho-tro' },
];

export default function useHeader() {
  const { user, isLoggedIn, isSellerStatusLoading, isSellerStatusError, refetchMe } = useAuth();

  return {
    user,
    isLoggedIn,
    isSellerStatusLoading,
    isSellerStatusError,
    refetchSellerStatus: refetchMe,
    menuItems: MENU_ITEMS,
  };
}
