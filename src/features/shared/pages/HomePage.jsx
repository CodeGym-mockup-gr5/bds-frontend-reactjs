import { Navigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { ROLES } from '../../../utils/auth';
import HomeDuAnSection from '../components/HomeDuAnSection';
import HomeSearchCard from '../components/HomeSearchCard';
import HomeThongBaoSection from '../components/HomeThongBaoSection';
import styles from './HomePage.module.css';

export default function HomePage() {
  const { hasRole, isAuthLoading } = useAuth();

  if (isAuthLoading) return null;

  if (hasRole([ROLES.ADMIN])) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className={styles.page}>
      <HomeSearchCard />
      <HomeThongBaoSection />
      <HomeDuAnSection />
    </div>
  );
}
