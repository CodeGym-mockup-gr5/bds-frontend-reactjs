import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProfileKhachHang, updateProfileKhachHang } from '../../../api/khachHangApi';

export const KHACH_HANG_PROFILE_QUERY_KEY = ['khachHangProfile'];

export default function useKhachHangProfile({ enabled = true } = {}) {
  const queryClient = useQueryClient();

  const profileQuery = useQuery({
    queryKey: KHACH_HANG_PROFILE_QUERY_KEY,
    queryFn: getProfileKhachHang,
    enabled,
    retry: false,
  });

  const updateMutation = useMutation({
    mutationFn: updateProfileKhachHang,
    onSuccess: (responseData) => {
      if (responseData?.data) {
        queryClient.setQueryData(KHACH_HANG_PROFILE_QUERY_KEY, responseData);
      } else {
        queryClient.invalidateQueries({ queryKey: KHACH_HANG_PROFILE_QUERY_KEY });
      }
      queryClient.invalidateQueries({ queryKey: ['authMe'] });
    },
  });

  return {
    profile: profileQuery.data?.data || null,
    isLoading: profileQuery.isLoading,
    isError: profileQuery.isError,
    error: profileQuery.error,
    refetch: profileQuery.refetch,
    updateProfileAsync: updateMutation.mutateAsync,
    isSubmitting: updateMutation.isPending,
  };
}
