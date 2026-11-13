import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  HUONG_OPTIONS,
  LOAI_BDS_OPTIONS,
  PAGE_SIZE,
  TINH_TRANG_OPTIONS,
  TU_KHOA_MAX_LENGTH,
  VI_TRI_OPTIONS,
} from '../constants';

const NUMBER_PATTERN = /^\d+(\.\d+)?$/;
const MOI_DANG_FLAG = '1';

export const EMPTY_FILTERS = {
  tuKhoa: '',
  loaiBds: '',
  viTri: '',
  huong: '',
  dienTichTu: '',
  dienTichDen: '',
  giaTu: '',
  giaDen: '',
};

function pickEnum(value, options) {
  return options.some((option) => option.value === value) ? value : '';
}

function pickNumber(value) {
  return value && NUMBER_PATTERN.test(value) ? value : '';
}

function pickPage(value) {
  const page = Number(value);
  return Number.isInteger(page) && page >= 1 ? page : 1;
}

function readFilters(searchParams) {
  return {
    tuKhoa: (searchParams.get('tuKhoa') || '').trim().slice(0, TU_KHOA_MAX_LENGTH),
    loaiBds: pickEnum(searchParams.get('loaiBds'), LOAI_BDS_OPTIONS),
    viTri: pickEnum(searchParams.get('viTri'), VI_TRI_OPTIONS),
    huong: pickEnum(searchParams.get('huong'), HUONG_OPTIONS),
    dienTichTu: pickNumber(searchParams.get('dienTichTu')),
    dienTichDen: pickNumber(searchParams.get('dienTichDen')),
    giaTu: pickNumber(searchParams.get('giaTu')),
    giaDen: pickNumber(searchParams.get('giaDen')),
  };
}

function compact(values) {
  return Object.fromEntries(
    Object.entries(values).filter(([, value]) => value !== '' && value !== undefined),
  );
}

export default function useBatDongSanFilters({ isNoiBo, isAdmin }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => readFilters(searchParams), [searchParams]);
  const tinhTrang = isNoiBo ? pickEnum(searchParams.get('tinhTrang'), TINH_TRANG_OPTIONS) : '';
  const moiDang = isAdmin && searchParams.get('moiDang') === MOI_DANG_FLAG;
  const page = pickPage(searchParams.get('page'));

  const baseParams = useMemo(() => compact(filters), [filters]);

  const apiParams = useMemo(
    () => ({ ...baseParams, ...compact({ tinhTrang }), page: page - 1, size: PAGE_SIZE }),
    [baseParams, tinhTrang, page],
  );

  const writeParams = useCallback(
    (next) => {
      setSearchParams(compact(next));
    },
    [setSearchParams],
  );

  const applyFilters = useCallback(
    (values) => writeParams({ ...values, tinhTrang }),
    [writeParams, tinhTrang],
  );

  const resetFilters = useCallback(() => writeParams({}), [writeParams]);

  const removeFilters = useCallback(
    (keys) => {
      const next = { ...filters, tinhTrang };
      keys.forEach((key) => {
        next[key] = '';
      });
      writeParams(next);
    },
    [writeParams, filters, tinhTrang],
  );

  const selectTinhTrang = useCallback(
    (value) => writeParams({ ...filters, tinhTrang: value }),
    [writeParams, filters],
  );

  const selectMoiDang = useCallback(
    () => writeParams({ ...filters, moiDang: MOI_DANG_FLAG }),
    [writeParams, filters],
  );

  const goToPage = useCallback(
    (nextPage) => {
      const mode = moiDang ? { moiDang: MOI_DANG_FLAG } : { tinhTrang };
      writeParams({ ...filters, ...mode, page: nextPage > 1 ? String(nextPage) : '' });
    },
    [writeParams, filters, tinhTrang, moiDang],
  );

  return {
    filters,
    filterKey: searchParams.toString(),
    tinhTrang,
    moiDang,
    page,
    baseParams,
    apiParams,
    hasActiveFilters: Object.keys(baseParams).length > 0,
    applyFilters,
    resetFilters,
    removeFilters,
    selectTinhTrang,
    selectMoiDang,
    goToPage,
  };
}
