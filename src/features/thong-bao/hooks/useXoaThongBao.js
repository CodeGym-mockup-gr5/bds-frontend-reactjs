import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteThongBao } from '../../../api/thongBaoApi';
import { THONG_BAO_QUERY_KEY } from '../constants/thongBaoOptions';

const DELETE_FAILED_MESSAGE = 'Không tồn tại dữ liệu để xóa';

async function deleteMany(ids) {
  const results = await Promise.allSettled(ids.map((id) => deleteThongBao(id)));
  const failed = results.filter((result) => result.status === 'rejected');
  return {
    total: ids.length,
    failedCount: failed.length,
    errorMessage: failed[0]?.reason?.response?.data?.message || DELETE_FAILED_MESSAGE,
  };
}

export default function useXoaThongBao() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMany,
    onSettled: () => queryClient.invalidateQueries({ queryKey: [THONG_BAO_QUERY_KEY] }),
  });
}
