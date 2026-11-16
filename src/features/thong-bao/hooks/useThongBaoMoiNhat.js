import { useQuery } from '@tanstack/react-query';
import { getThongBaoMoiNhat } from '../../../api/thongBaoApi';
import { THONG_BAO_QUERY_KEY } from '../constants/thongBaoOptions';

export default function useThongBaoMoiNhat(limit = 5) {
  const query = useQuery({
    queryKey: [THONG_BAO_QUERY_KEY, 'moi-nhat', limit],
    queryFn: () => getThongBaoMoiNhat(limit),
  });

  const payload = Array.isArray(query.data) ? query.data : query.data?.data;
  const items = Array.isArray(payload) ? payload : [];

  return {
    items,
    isPending: query.isPending,
    isError: query.isError,
    isFetching: query.isFetching,
    refetch: query.refetch,
  };
}
