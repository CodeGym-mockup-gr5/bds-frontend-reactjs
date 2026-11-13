import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProfileNhanVien, updateProfileNhanVien } from '../api/nhanVienProfileApi';

export const NHAN_VIEN_PROFILE_QUERY_KEY = ['nhanVienProfile'];

export default function useNhanVienProfile() {
  const queryClient = useQueryClient();

  const profileQuery = useQuery({
    queryKey: NHAN_VIEN_PROFILE_QUERY_KEY,
    queryFn: getProfileNhanVien,
    retry: false,
  });

  const updateMutation = useMutation({
    mutationFn: updateProfileNhanVien,
    onSuccess: (responseData) => {
      if (responseData) {
        queryClient.setQueryData(NHAN_VIEN_PROFILE_QUERY_KEY, responseData);
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
    updateProfile: updateMutation.mutate,
    updateProfileAsync: updateMutation.mutateAsync,
    isSubmitting: updateMutation.isPending,
  };
}
