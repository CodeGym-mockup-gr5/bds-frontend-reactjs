import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { getDefaultRouteByUser } from '../../../utils/auth';
import styles from './RoleRoute.module.css';

export default function RoleRoute({ allowedRoles = null, children = null }) {
  const location = useLocation();
  const { user, isLoggedIn, isAuthLoading, hasRole } = useAuth();

  if (isAuthLoading) {
    return (
      <div className={styles.loadingWrapper} aria-busy="true">
        <div className={styles.spinner} aria-hidden="true" />
        <p className={styles.loadingText}>Đang kiểm tra phiên đăng nhập...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/dang-nhap" state={{ from: location }} replace />;
  }

  if (Array.isArray(allowedRoles) && allowedRoles.length > 0 && !hasRole(allowedRoles)) {
    return <Navigate to={getDefaultRouteByUser(user)} replace />;
  }

  return children || <Outlet />;
}
