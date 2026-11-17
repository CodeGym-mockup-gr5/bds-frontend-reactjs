import { Navigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { getDefaultRouteByUser } from '../../../utils/auth';
import LoginForm from '../components/LoginForm';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  const { user, isLoggedIn, isAuthLoading, isAuthError, handleLoginSuccess } = useAuth();

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
    return <Navigate to={getDefaultRouteByUser(user)} replace />;
  }

  return (
    <section className={styles.page}>
      <div className={styles.wrapper}>
        <LoginForm onSuccess={(responseData) => handleLoginSuccess(responseData)} withShadow />
      </div>
    </section>
  );
}
