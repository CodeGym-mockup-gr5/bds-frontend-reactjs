import { Outlet } from 'react-router-dom';
import AdminSidebar from './admin/AdminSidebar';
import AdminTopbar from './admin/AdminTopbar';
import styles from './AdminLayout.module.css';

export default function AdminLayout() {
  return (
    <div className={styles.layout}>
      <AdminSidebar />
      <div className={styles.main}>
        <AdminTopbar />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
