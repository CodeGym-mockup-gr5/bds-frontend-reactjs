import { Outlet } from 'react-router-dom';
import Header from './Header';
import AdminSidebar from './components/AdminSidebar';
import styles from './AdminLayout.module.css';

export default function AdminLayout() {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.body}>
        <div className={styles.sidebarSlot}>
          <AdminSidebar />
        </div>
        <div className={styles.mainArea}>
          <main className={styles.content}>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
