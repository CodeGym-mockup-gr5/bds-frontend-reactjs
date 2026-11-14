import { Outlet } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
import AdminTopbar from './components/AdminTopbar';
import styles from './AdminLayout.module.css';

export default function AdminLayout() {
  return (
    <div className={styles.layout}>
      <AdminSidebar />
      <div className={styles.mainArea}>
        <AdminTopbar />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
