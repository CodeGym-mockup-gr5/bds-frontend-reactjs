import { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from '../Header.module.css';

export default function AccountDropdown({
  user = null,
  isOpen,
  onClose,
  onLogout,
  triggerRef = null,
}) {
  const dropdownRef = useRef(null);

  const handleLogoutClick = useCallback(() => {
    onClose();
    onLogout();
  }, [onClose, onLogout]);

  useEffect(() => {
    if (!isOpen) return undefined;

    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !triggerRef?.current?.contains(event.target)
      ) {
        onClose();
      }
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  const rawAvatarName = (user?.hoTen || user?.tenDangNhap || '').trim();
  const avatarInitial = rawAvatarName ? rawAvatarName.charAt(0).toUpperCase() : 'U';

  return (
    <div ref={dropdownRef} className={styles.dropdownMenu} role="menu" aria-label="Menu tài khoản">
      <div className={styles.dropdownHeader}>
        <div className={styles.dropdownUserAvatar}>{avatarInitial}</div>
        <div className={styles.dropdownUserInfo}>
          <span className={styles.dropdownUserName}>
            {user?.hoTen || user?.tenDangNhap || 'Tài khoản'}
          </span>
          <span className={styles.dropdownUserSub}>
            {user?.tenDangNhap ? `@${user.tenDangNhap}` : 'Thành viên'}
          </span>
        </div>
      </div>

      <div className={styles.dropdownDivider} />

      <ul className={styles.dropdownList}>
        <li role="none">
          <Link
            to="/tin-dang-cua-toi"
            className={styles.dropdownItem}
            role="menuitem"
            onClick={onClose}
          >
            <svg
              className={styles.dropdownIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            Tin đăng của tôi
          </Link>
        </li>
        <li role="none">
          <Link
            to="/thong-tin-ca-nhan"
            className={styles.dropdownItem}
            role="menuitem"
            onClick={onClose}
          >
            <svg
              className={styles.dropdownIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Thông tin cá nhân
          </Link>
        </li>
        <li role="none">
          <Link
            to="/doi-mat-khau"
            className={styles.dropdownItem}
            role="menuitem"
            onClick={onClose}
          >
            <svg
              className={styles.dropdownIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Đổi mật khẩu
          </Link>
        </li>
      </ul>

      <div className={styles.dropdownDivider} />

      <button
        type="button"
        className={styles.dropdownLogout}
        role="menuitem"
        onClick={handleLogoutClick}
      >
        <svg
          className={styles.dropdownIconDanger}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        Đăng xuất
      </button>
    </div>
  );
}
