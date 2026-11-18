import { useQuery } from '@tanstack/react-query';
import { searchBatDongSan } from '../../../api/batDongSanApi';
import useAuth from '../../../hooks/useAuth';

export default function useBdsMoiDang(size = 4) {
  const { user } = useAuth();
  const params = { page: 0, size, sort: 'ngayDang,desc', tinhTrang: 'CO_SAN' };

  const query = useQuery({
    queryKey: ['batDongSan', 'homeMoiDang', user?.id ?? null, params],
    queryFn: () => searchBatDongSan(params),
  });

  return {
    items: query.data?.data?.content || [],
    isPending: query.isPending,
    isError: query.isError,
    isFetching: query.isFetching,
    refetch: query.refetch,
  };
}
