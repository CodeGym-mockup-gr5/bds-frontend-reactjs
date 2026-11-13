import { useQuery } from '@tanstack/react-query';
import { getMe } from '../api/authApi';
import { getToken } from '../utils/auth';

const MENU_ITEMS = [
  { nhan: 'Mua bán', duongDan: '/bat-dong-san' },
  { nhan: 'Dự án', duongDan: '/du-an' },
  { nhan: 'Hỗ trợ', duongDan: '/ho-tro' },
];

export default function useHeader() {
  const token = getToken();

  const meQuery = useQuery({
    queryKey: ['authMe', token],
    queryFn: getMe,
    enabled: Boolean(token),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  const user = meQuery.data?.data || null;
  const isLoggedIn = Boolean(token && !meQuery.isError);
  const isSellerStatusLoading = Boolean(token && meQuery.isLoading);
  const isSellerStatusError = Boolean(token && meQuery.isError);

  return {
    user,
    isLoggedIn,
    isSellerStatusLoading,
    isSellerStatusError,
    refetchSellerStatus: meQuery.refetch,
    menuItems: MENU_ITEMS,
  };
}
