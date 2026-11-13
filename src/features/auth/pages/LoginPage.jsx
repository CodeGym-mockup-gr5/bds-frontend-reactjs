import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { getDefaultRouteByUser, hasAnyRole } from '../../../utils/auth';
import LoginForm from '../components/LoginForm';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const location = useLocation();
  const { user, isLoggedIn, isAuthLoading, handleLoginSuccess } = useAuth();

  const fromPath = location.state?.from?.pathname || null;

  if (isAuthLoading) {
    return (
      <section className={styles.page}>
        <div className={styles.wrapper}>
          <LoginForm isLoadingSkeleton withShadow />
        </div>
      </section>
    );
  }

  if (isLoggedIn) {
    const defaultRoute = getDefaultRouteByUser(user);
    const targetRoute = hasAnyRole(user, ['ADMIN', 'NHAN_VIEN'])
      ? defaultRoute
      : fromPath || defaultRoute;
    return <Navigate to={targetRoute} replace />;
  }

  return (
    <section className={styles.page}>
      <div className={styles.wrapper}>
        <LoginForm
          onSuccess={(responseData) => handleLoginSuccess(responseData, fromPath || '/')}
          withShadow
        />
      </div>
    </section>
  );
}
