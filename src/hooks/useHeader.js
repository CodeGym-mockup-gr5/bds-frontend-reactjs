import { useQuery } from '@tanstack/react-query';
import { getHeader } from '../api/headerApi';
import { getMe } from '../api/authApi';
import { getToken } from '../utils/auth';

const DEFAULT_GUEST_DATA = {
  logo: null,
  tenThuongHieu: 'REALIA',
  daDangNhap: false,
  coNutDangTin: false,
  coThongBao: false,
  danhSachMenu: [
    { nhan: 'Mua bán', duongDan: '/bat-dong-san' },
    { nhan: 'Dự án', duongDan: '/du-an' },
    { nhan: 'Hỗ trợ', duongDan: '/ho-tro' },
  ],
  danhSachHanhDong: [
    { maHanhDong: 'DANG_KY', nhan: 'Đăng ký', kieu: 'BUTTON', duongDan: '/dang-ky' },
    { maHanhDong: 'DANG_NHAP', nhan: 'Đăng nhập', kieu: 'BUTTON', duongDan: '/dang-nhap' },
  ],
  nguoiDung: null,
};

const DEFAULT_LOGGED_IN_DATA = {
  logo: null,
  tenThuongHieu: 'REALIA',
  daDangNhap: true,
  coNutDangTin: true,
  coThongBao: true,
  danhSachMenu: [
    { nhan: 'Mua bán', duongDan: '/bat-dong-san' },
    { nhan: 'Dự án', duongDan: '/du-an' },
    { nhan: 'Hỗ trợ', duongDan: '/ho-tro' },
  ],
  danhSachHanhDong: [
    { maHanhDong: 'THONG_BAO', nhan: 'Thông báo', kieu: 'ICON', duongDan: '/thong-bao' },
    { maHanhDong: 'DANG_TIN', nhan: '+ Đăng tin', kieu: 'BUTTON', duongDan: '/dang-tin' },
  ],
  nguoiDung: {
    id: 101,
    tenDangNhap: 'minhanh',
    hoTen: 'Minh Anh',
    kyTuDaiDien: 'MA',
    vaiTro: ['ROLE_KHACH_HANG'],
    laKhBan: true,
    trangThaiDuyet: 'DA_DUYET',
  },
};

export default function useHeader() {
  const storedToken = getToken();

  let mockLaKhBan;
  let mockTrangThaiDuyet;
  try {
    const rawMockLaKhBan = sessionStorage.getItem('mockLaKhBan');
    if (rawMockLaKhBan !== null) {
      mockLaKhBan = rawMockLaKhBan === 'true';
    }
    mockTrangThaiDuyet = sessionStorage.getItem('mockTrangThaiDuyet') || undefined;
  } catch {
    mockLaKhBan = undefined;
  }

  const token =
    storedToken || (mockTrangThaiDuyet || mockLaKhBan !== undefined ? 'mock-test-token' : null);

  const headerQuery = useQuery({
    queryKey: ['header', token ? 'authenticated' : 'guest'],
    queryFn: getHeader,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  const meQuery = useQuery({
    queryKey: ['authMe', token],
    queryFn: getMe,
    enabled: Boolean(token),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  const fallbackData = token ? DEFAULT_LOGGED_IN_DATA : DEFAULT_GUEST_DATA;
  const headerData = headerQuery.data?.data || fallbackData;
  const meData = meQuery.data?.data;

  const rawUser = headerData.nguoiDung;

  let laKhBan;
  if (mockLaKhBan !== undefined) {
    laKhBan = mockLaKhBan;
  } else if (meData?.laKhBan !== undefined) {
    laKhBan = meData.laKhBan;
  } else if (headerQuery.isError && rawUser) {
    laKhBan = rawUser.laKhBan;
  } else {
    laKhBan = undefined;
  }

  const trangThaiDuyet = mockTrangThaiDuyet || meData?.trangThaiDuyet || rawUser?.trangThaiDuyet;

  const user = rawUser
    ? {
        ...rawUser,
        laKhBan,
        trangThaiDuyet,
      }
    : null;

  const isLoggedIn = Boolean(token && (headerData.daDangNhap || user));
  const isSellerStatusLoading = Boolean(isLoggedIn && meQuery.isLoading && laKhBan === undefined);
  const isSellerStatusError = Boolean(isLoggedIn && meQuery.isError && laKhBan === undefined);

  return {
    headerData,
    user,
    isLoggedIn,
    isSellerStatusLoading,
    isSellerStatusError,
    refetchSellerStatus: meQuery.refetch,
    isLoading: headerQuery.isLoading,
    isError: headerQuery.isError,
    error: headerQuery.error,
    refetch: headerQuery.refetch,
  };
}
