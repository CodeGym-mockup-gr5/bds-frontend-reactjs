import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getDanhSachThongBao } from '../../../api/thongBaoApi';
import { THONG_BAO_PAGE_SIZE, THONG_BAO_QUERY_KEY } from '../constants/thongBaoOptions';

export default function useDanhSachThongBao() {
  const [page, setPage] = useState(0);

  const query = useQuery({
    queryKey: [THONG_BAO_QUERY_KEY, 'list', page],
    queryFn: () => getDanhSachThongBao({ page, size: THONG_BAO_PAGE_SIZE }),
    placeholderData: keepPreviousData,
  });

  const pageData = query.data?.data;
  const items = Array.isArray(pageData?.content) ? pageData.content : [];
  const totalElements = Number(pageData?.totalElements) || 0;
  const totalPages = Number(pageData?.totalPages) || 0;

  if (!query.isPlaceholderData && totalPages > 0 && page >= totalPages) {
    setPage(totalPages - 1);
  }

  return {
    page,
    setPage,
    size: THONG_BAO_PAGE_SIZE,
    items,
    totalElements,
    totalPages,
    isPending: query.isPending,
    isFetching: query.isFetching,
    isError: query.isError,
    isPlaceholderData: query.isPlaceholderData,
    refetch: query.refetch,
  };
}
