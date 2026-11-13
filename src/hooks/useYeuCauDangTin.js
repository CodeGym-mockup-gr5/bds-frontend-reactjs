import { useMutation, useQueryClient } from '@tanstack/react-query';
import { yeuCauDangTinBan } from '../api/khachHangApi';

export default function useYeuCauDangTin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: yeuCauDangTinBan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authMe'] });
    },
  });
}
