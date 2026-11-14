import { Navigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { ROLES } from '../../../utils/auth';

export default function HomePage() {
  const { hasRole, isAuthLoading } = useAuth();

  if (isAuthLoading) return null;

  if (hasRole([ROLES.ADMIN])) {
    return <Navigate to="/admin/nhan-vien" replace />;
  }

  return <h1>Trang chủ</h1>;
}
