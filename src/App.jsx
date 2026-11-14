import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import AuthModals from './features/auth/components/AuthModals';
import RoleRoute from './features/auth/components/RoleRoute';
import { AuthProvider } from './features/auth/context/AuthContext';
import DoiMatKhauPage from './features/auth/pages/DoiMatKhauPage';
import LoginPage from './features/auth/pages/LoginPage';
import DangTinPage from './features/bat-dong-san/pages/DangTinPage';
import DanhSachNhanVienPage from './features/nhan-vien/pages/DanhSachNhanVienPage';
import SuaThongTinCaNhanPage from './features/nhan-vien/pages/SuaThongTinCaNhanPage';
import DanhSachNhuCauPage from './features/nhu-cau/pages/DanhSachNhuCauPage';
import AccountLayout from './features/shared/layout/AccountLayout';
import AdminLayout from './features/shared/layout/AdminLayout';
import Layout from './features/shared/layout/Layout';
import HomePage from './features/shared/pages/HomePage';
import NotFoundPage from './features/shared/pages/NotFoundPage';
import { ROLES } from './utils/auth';

function RootLayout() {
  return (
    <AuthProvider>
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
        element: <RoleRoute allowedRoles={[ROLES.ADMIN, ROLES.NHAN_VIEN]} />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              { path: 'admin', element: <Navigate to="/admin/nhan-vien" replace /> },
              { path: 'admin/nhan-vien', element: <DanhSachNhanVienPage /> },
              { path: 'nhan-vien', element: <DanhSachNhanVienPage /> },
            ],
          },
        ],
      },
      {
        path: '/',
        element: <Layout />,
        children: [
          { index: true, element: <HomePage /> },
          { path: 'dang-nhap', element: <LoginPage /> },
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
              {
                element: <AccountLayout />,
                children: [{ path: 'thong-tin-ca-nhan', element: <SuaThongTinCaNhanPage /> }],
              },
            ],
          },
          {
            element: <RoleRoute allowedRoles={[ROLES.ADMIN]} />,
            children: [{ path: 'admin', element: <HomePage /> }],
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
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
