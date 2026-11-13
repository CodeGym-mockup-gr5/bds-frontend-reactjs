import { Outlet } from 'react-router-dom';
import AccountSidebar from './components/AccountSidebar';
import styles from './AccountLayout.module.css';

export default function AccountLayout() {
  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <div className={styles.sidebar}>
          <AccountSidebar />
        </div>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
