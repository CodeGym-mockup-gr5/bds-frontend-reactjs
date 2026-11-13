import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../../../api/authApi';
import { removeToken } from '../../../utils/auth';
import styles from './AccountSidebar.module.css';

const SIDEBAR_ITEMS = [
  { to: '/tin-dang-cua-toi', label: 'Tin đăng của tôi', icon: 'posts' },
  { to: '/thong-tin-ca-nhan', label: 'Thông tin cá nhân', icon: 'profile' },
  { to: '/doi-mat-khau', label: 'Đổi mật khẩu', icon: 'password' },
];

function SidebarItemIcon({ type }) {
  if (type === 'posts') {
    return (
      <svg
        className={styles.menuIcon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    );
  }
  if (type === 'password') {
    return (
      <svg
        className={styles.menuIcon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    );
  }
  return (
    <svg
      className={styles.menuIcon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

SidebarItemIcon.propTypes = {
  type: PropTypes.oneOf(['posts', 'profile', 'password']).isRequired,
};

export default function AccountSidebar() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = useCallback(async () => {
    await logoutApi().catch(() => undefined);
    removeToken();
    queryClient.clear();
    navigate('/');
  }, [navigate, queryClient]);

  return (
    <aside className={styles.sidebar} aria-label="Menu tài khoản">
      <div className={styles.menuCard}>
        <nav aria-label="Điều hướng tài khoản">
          <ul className={styles.menuList}>
            {SIDEBAR_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive ? `${styles.menuLink} ${styles.menuLinkActive}` : styles.menuLink
                  }
                >
                  <SidebarItemIcon type={item.icon} />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.divider} />

        <button type="button" className={styles.logoutButton} onClick={handleLogout}>
          <svg
            className={styles.logoutIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          <span>Đăng xuất</span>
        </button>
      </div>

      <div className={styles.supportCard}>
        <div className={styles.supportHeader}>
          <svg
            className={styles.supportIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <h2 className={styles.supportTitle}>Cần hỗ trợ đăng tin?</h2>
        </div>
        <p className={styles.supportDesc}>
          Gọi hotline hoặc xem quy định đăng tin để tin được duyệt nhanh hơn.
        </p>
        <a href="tel:0919591234" className={styles.hotline}>
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span>0919 591 234</span>
        </a>
      </div>
    </aside>
  );
}
