import { useEffect, useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getDanhSachNhanVien } from '../../../api/nhanVienApi';
import useAuth from '../../../hooks/useAuth';
import { DEFAULT_PAGE_SIZE, NHAN_VIEN_QUERY_KEY } from '../constants/nhanVienConstants';
import { EMPTY_FILTER, buildNhanVienParams, hasActiveFilter } from '../utils/nhanVienFilter';

export default function useDanhSachNhanVien() {
  const { user } = useAuth();
  const [draftFilter, setDraftFilter] = useState(EMPTY_FILTER);
  const [appliedFilter, setAppliedFilter] = useState(EMPTY_FILTER);
  const [page, setPage] = useState(0);

  const query = useQuery({
    queryKey: [NHAN_VIEN_QUERY_KEY, user?.id, appliedFilter, page],
    queryFn: () => getDanhSachNhanVien(buildNhanVienParams(appliedFilter, page)),
    placeholderData: keepPreviousData,
    enabled: Boolean(user?.id),
  });

  const pageData = query.data?.data;
  const items = Array.isArray(pageData?.content) ? pageData.content : [];
  const totalElements = Number(pageData?.totalElements) || 0;
  const totalPages = Number(pageData?.totalPages) || 0;
  const pageSize = Number(pageData?.size) || DEFAULT_PAGE_SIZE;

  useEffect(() => {
    if (!query.isPlaceholderData && totalPages > 0 && page >= totalPages) {
      setPage(totalPages - 1);
    }
  }, [totalPages, page, query.isPlaceholderData]);

  const changeDraft = (name, value) => {
    setDraftFilter((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilter = (e) => {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    setAppliedFilter({ ...draftFilter });
    setPage(0);
  };

  return {
    draftFilter,
    changeDraft,
    applyFilter,
    isFiltered: hasActiveFilter(appliedFilter),
    page,
    setPage,
    items,
    totalElements,
    totalPages,
    pageSize,
    isPending: query.isPending,
    isFetching: query.isFetching,
    isPlaceholderData: query.isPlaceholderData,
    isError: query.isError,
    refetch: query.refetch,
  };
}
