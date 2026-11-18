import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { searchBatDongSan } from '../../../api/batDongSanApi';
import useAuth from '../../../hooks/useAuth';
import useKhachHangProfile from '../../khach-hang/hooks/useKhachHangProfile';
import { PAGE_SIZE } from '../constants/batDongSanList';

const SORT_MOI_NHAT = 'ngayDang,desc';

function pickPage(value) {
  const page = Number(value);
  return Number.isInteger(page) && page >= 1 ? page : 1;
}

export default function useTinDangCuaToi() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = pickPage(searchParams.get('page'));
  const profileQuery = useKhachHangProfile();
  const khachHangId = profileQuery.profile?.id;

  const params = { khachHangId, page: page - 1, size: PAGE_SIZE, sort: SORT_MOI_NHAT };
  const listQuery = useQuery({
    queryKey: ['batDongSan', 'tinDangCuaToi', user?.id ?? null, params],
    queryFn: () => searchBatDongSan(params),
    placeholderData: keepPreviousData,
    retry: 1,
    enabled: Boolean(khachHangId),
  });

  const pageData = listQuery.data?.data;
  const items = pageData?.content || [];

  const setPage = (nextPage) => {
    setSearchParams(nextPage > 1 ? { page: String(nextPage) } : {});
  };

  const refetch = () => {
    if (profileQuery.isError) profileQuery.refetch();
    else listQuery.refetch();
  };

  return {
    items,
    page,
    setPage,
    totalElements: pageData?.totalElements || 0,
    totalPages: pageData?.totalPages || 0,
    isLoading: profileQuery.isLoading || listQuery.isLoading,
    isError: profileQuery.isError || listQuery.isError,
    isFetching: listQuery.isFetching,
    isPlaceholderData: listQuery.isPlaceholderData,
    refetch,
  };
}
