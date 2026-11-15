import HomeDuAnSection from '../components/HomeDuAnSection';
import HomeSearchCard from '../components/HomeSearchCard';
import HomeThongBaoSection from '../components/HomeThongBaoSection';
import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={styles.page}>
      <HomeSearchCard />
      <HomeThongBaoSection />
      <HomeDuAnSection />
    </div>
  );
}
