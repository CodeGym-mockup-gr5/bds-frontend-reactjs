import useAuth from '../../../../hooks/useAuth';
import styles from './AdminTopbar.module.css';

export default function AdminTopbar() {
  const { user } = useAuth();
  const displayName = user?.hoTen || user?.tenDangNhap || 'Admin';

  return (
    <header className={styles.topbar}>
      <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
        <span>Quản lý nhân viên</span>
        <span className={styles.breadcrumbSeparator} aria-hidden="true">
          /
        </span>
        <span className={styles.breadcrumbCurrent} aria-current="page">
          Danh sách
        </span>
      </nav>

      <div className={styles.actions}>
        <button type="button" className={styles.notificationButton} aria-label="Thông báo">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>

        <div className={styles.userWidget}>
          <div className={styles.avatar} aria-hidden="true">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <span className={styles.userName}>{displayName}</span>
        </div>
      </div>
    </header>
  );
}
