import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from './admin/AdminSidebar';
import AdminTopbar from './admin/AdminTopbar';
import styles from './AdminLayout.module.css';

export default function AdminLayout() {
  const { pathname } = useLocation();
  const contentRef = useRef(null);

  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className={styles.layout}>
      <AdminSidebar />
      <div className={styles.main}>
        <AdminTopbar />
        <main ref={contentRef} className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
