import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getNhuCauCuaToi } from '../../../api/nhuCauApi';
import { NHU_CAU_QUERY_KEY } from '../constants/nhuCauOptions';
import {
  DIEN_TICH_ERROR,
  EMPTY_FILTER,
  buildNhuCauParams,
  hasActiveFilter,
  normalizeDienTich,
} from '../utils/nhuCauFilter';

export default function useDanhSachNhuCau() {
  const [draftFilter, setDraftFilter] = useState(EMPTY_FILTER);
  const [appliedFilter, setAppliedFilter] = useState(EMPTY_FILTER);
  const [page, setPage] = useState(0);
  const [dienTichError, setDienTichError] = useState('');

  const query = useQuery({
    queryKey: [NHU_CAU_QUERY_KEY, appliedFilter, page],
    queryFn: () => getNhuCauCuaToi(buildNhuCauParams(appliedFilter, page)),
    placeholderData: keepPreviousData,
  });

  const pageData = query.data?.data;
  const items = Array.isArray(pageData?.content) ? pageData.content : [];
  const totalElements = Number(pageData?.totalElements) || 0;
  const totalPages = Number(pageData?.totalPages) || 0;

  if (!query.isPlaceholderData && totalPages > 0 && page >= totalPages) {
    setPage(totalPages - 1);
  }

  const changeDraft = (name, value) => {
    setDraftFilter((prev) => ({ ...prev, [name]: value }));
    if (name === 'dienTich' && dienTichError) setDienTichError('');
  };

  const applyFilter = () => {
    const dienTich = normalizeDienTich(draftFilter.dienTich);
    if (dienTich === null) {
      setDienTichError(DIEN_TICH_ERROR);
      return;
    }
    setDienTichError('');
    setAppliedFilter({ ...draftFilter, dienTich });
    setPage(0);
  };

  const clearFilter = () => {
    setDraftFilter(EMPTY_FILTER);
    setAppliedFilter(EMPTY_FILTER);
    setDienTichError('');
    setPage(0);
  };

  return {
    draftFilter,
    dienTichError,
    changeDraft,
    applyFilter,
    clearFilter,
    isFiltered: hasActiveFilter(appliedFilter),
    page,
    setPage,
    items,
    totalElements,
    totalPages,
    isPending: query.isPending,
    isRecoveringPage: query.isFetching && items.length === 0 && totalElements > 0,
    isFetching: query.isFetching,
    isError: query.isError,
    isPlaceholderData: query.isPlaceholderData,
    refetch: query.refetch,
  };
}
