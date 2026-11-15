import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createThongBao, updateThongBao } from '../../../api/thongBaoApi';
import { THONG_BAO_QUERY_KEY } from '../constants/thongBaoOptions';

export function useThemThongBao() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createThongBao,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [THONG_BAO_QUERY_KEY] }),
  });
}

export function useSuaThongBao() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => updateThongBao(id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [THONG_BAO_QUERY_KEY] }),
  });
}
