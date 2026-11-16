import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from 'react-router-dom';
import AuthModals from './features/auth/components/AuthModals';
import BatDongSanDetailPage from './features/bat-dong-san/pages/BatDongSanDetailPage';
import BatDongSanListPage from './features/bat-dong-san/pages/BatDongSanListPage';
import RoleRoute from './features/auth/components/RoleRoute';
import { AuthProvider } from './features/auth/context/AuthContext';
import DatMatKhauPage from './features/auth/pages/DatMatKhauPage';
import DoiMatKhauPage from './features/auth/pages/DoiMatKhauPage';
import LoginPage from './features/auth/pages/LoginPage';
import QuenMatKhauPage from './features/auth/pages/QuenMatKhauPage';
import DangTinPage from './features/bat-dong-san/pages/DangTinPage';
import HoTroPage from './features/ho-tro/pages/HoTroPage';
import DanhSachNhanVienPage from './features/nhan-vien/pages/DanhSachNhanVienPage';
import ThemNhanVienPage from './features/nhan-vien/pages/ThemNhanVienPage';
import SuaThongTinCaNhanPage from './features/nhan-vien/pages/SuaThongTinCaNhanPage';
import DanhSachNhuCauPage from './features/nhu-cau/pages/DanhSachNhuCauPage';
import AccountLayout from './features/shared/layout/AccountLayout';
import AdminLayout from './features/shared/layout/AdminLayout';
import Layout from './features/shared/layout/Layout';
import HomePage from './features/shared/pages/HomePage';
import NotFoundPage from './features/shared/pages/NotFoundPage';
import QuanLyThongBaoPage from './features/thong-bao/pages/QuanLyThongBaoPage';
import { ROLES } from './utils/auth';

const getScrollKey = (location) => location.pathname;

function RootLayout() {
  return (
    <AuthProvider>
      <ScrollRestoration getKey={getScrollKey} />
      <Outlet />
      <AuthModals />
    </AuthProvider>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'dang-nhap', element: <LoginPage /> },
          { path: 'quen-mat-khau', element: <QuenMatKhauPage /> },
          { path: 'dat-mat-khau', element: <DatMatKhauPage /> },
          { path: 'bat-dong-san', element: <BatDongSanListPage /> },
          { path: 'bat-dong-san/:id', element: <BatDongSanDetailPage /> },
          { path: 'ho-tro', element: <HoTroPage /> },
          {
            element: <RoleRoute allowedRoles={[ROLES.KHACH_HANG]} />,
            children: [
              { path: 'khach-hang', element: <HomePage /> },
              {
                element: <AccountLayout />,
                children: [{ path: 'nhu-cau-cua-toi', element: <DanhSachNhuCauPage /> }],
              },
              { path: 'dang-tin', element: <DangTinPage /> },
            ],
          },
          {
            element: <RoleRoute allowedRoles={[ROLES.NHAN_VIEN, ROLES.ADMIN]} />,
            children: [
              { path: 'nhan-vien', element: <HomePage /> },
              {
                element: <AccountLayout />,
                children: [{ path: 'thong-tin-ca-nhan', element: <SuaThongTinCaNhanPage /> }],
              },
            ],
          },
          {
            element: <RoleRoute allowedRoles={[ROLES.ADMIN]} />,
            children: [{ path: 'admin', element: <Navigate to="/admin/thong-bao" replace /> }],
          },
          {
            element: <RoleRoute allowedRoles={[ROLES.KHACH_HANG, ROLES.NHAN_VIEN, ROLES.ADMIN]} />,
            children: [
              {
                element: <AccountLayout />,
                children: [{ path: 'doi-mat-khau', element: <DoiMatKhauPage /> }],
              },
            ],
          },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
      {
        element: <RoleRoute allowedRoles={[ROLES.ADMIN]} />,
        children: [
          {
            path: 'admin/thong-bao',
            element: <AdminLayout />,
            children: [
              {
                index: true,
                element: <QuanLyThongBaoPage />,
                handle: { breadcrumb: ['Thông báo', 'Danh sách'] },
              },
            ],
          },
          {
            path: 'admin/nhan-vien',
            element: <AdminLayout />,
            children: [
              {
                index: true,
                element: <DanhSachNhanVienPage />,
                handle: { breadcrumb: ['Nhân viên', 'Danh sách'] },
              },
              {
                path: 'them-moi',
                element: <ThemNhanVienPage />,
                handle: { breadcrumb: ['Nhân viên', 'Thêm mới'] },
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
