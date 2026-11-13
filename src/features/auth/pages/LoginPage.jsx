import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { resolvePostLoginRoute } from '../../../utils/auth';
import LoginForm from '../components/LoginForm';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const location = useLocation();
  const { user, isLoggedIn, isAuthLoading, isAuthError, handleLoginSuccess } = useAuth();

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

  if (isLoggedIn && !isAuthError && user) {
    return <Navigate to={resolvePostLoginRoute(user, fromPath)} replace />;
  }

  return (
    <section className={styles.page}>
      <div className={styles.wrapper}>
        <LoginForm
          onSuccess={(responseData) => handleLoginSuccess(responseData, fromPath)}
          withShadow
        />
      </div>
    </section>
  );
}
