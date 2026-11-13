import { keepPreviousData, useQueries, useQuery } from '@tanstack/react-query';
import { getBatDongSanMoiDang, searchBatDongSan } from '../../../api/batDongSanApi';
import { PAGE_SIZE, TINH_TRANG_OPTIONS } from '../constants';

const COUNT_KEYS = ['', ...TINH_TRANG_OPTIONS.map((option) => option.value)];

function getAnhDaiDien(danhSachHinhAnh) {
  if (!Array.isArray(danhSachHinhAnh) || !danhSachHinhAnh.length) {
    return null;
  }
  const [first] = [...danhSachHinhAnh].sort((a, b) => a.thuTu - b.thuTu);
  return first.duongDan;
}

function toListItem(item) {
  return {
    id: item.id,
    maBds: item.maBds,
    khachHangId: item.khachHangId,
    maKh: null,
    tenChuSoHuu: item.tenKhachHang,
    loaiBds: item.loaiBds,
    diaChi: item.diaChi,
    viTri: item.viTri,
    huong: item.huong,
    dienTich: item.dienTich,
    gia: item.gia,
    giaM2: item.giaM2,
    tinhTrang: item.tinhTrang,
    ghiChu: item.ghiChu,
    ngayDang: item.ngayDang,
    anhDaiDien: getAnhDaiDien(item.danhSachHinhAnh),
  };
}

async function fetchMoiDang(page) {
  const response = await getBatDongSanMoiDang({ page, size: PAGE_SIZE });
  const pageData = response.data;
  return { ...response, data: { ...pageData, content: pageData.content.map(toListItem) } };
}

export default function useBatDongSanList({ apiParams, baseParams, moiDang, isNoiBo, enabled }) {
  const listQuery = useQuery({
    queryKey: moiDang
      ? ['batDongSan', 'moiDang', apiParams.page]
      : ['batDongSan', 'list', apiParams],
    queryFn: () => (moiDang ? fetchMoiDang(apiParams.page) : searchBatDongSan(apiParams)),
    placeholderData: keepPreviousData,
    retry: 1,
    enabled,
  });

  const countQueries = useQueries({
    queries: COUNT_KEYS.map((tinhTrang) => {
      const params = { ...baseParams, page: 0, size: 1, ...(tinhTrang ? { tinhTrang } : {}) };
      return {
        queryKey: ['batDongSan', 'list', params],
        queryFn: () => searchBatDongSan(params),
        retry: 1,
        enabled: enabled && isNoiBo,
      };
    }),
  });

  const counts = Object.fromEntries(
    COUNT_KEYS.map((key, index) => [key, countQueries[index].data?.data?.totalElements]),
  );

  const pageData = listQuery.data?.data;

  return {
    items: pageData?.content || [],
    totalElements: pageData?.totalElements || 0,
    totalPages: pageData?.totalPages || 0,
    counts,
    isLoading: listQuery.isLoading || !enabled,
    isFetching: listQuery.isFetching,
    isPlaceholderData: listQuery.isPlaceholderData,
    isError: listQuery.isError,
    refetch: listQuery.refetch,
  };
}
