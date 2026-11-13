import { useId, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from '../Header.module.css';
import AccountDropdown from './AccountDropdown';

export default function HeaderActions({
  isLoggedIn,
  user = null,
  coThongBao = false,
  showDangTin = true,
  isSellerStatusLoading = false,
  onOpenLogin,
  onOpenRegister,
  onLogout,
  onDangTinClick,
  isAccountMenuOpen,
  onToggleAccountMenu,
  onCloseAccountMenu,
}) {
  const triggerRef = useRef(null);
  const choDuyetMessageId = useId();

  if (!isLoggedIn) {
    return (
      <div className={styles.actionsGuest}>
        <button type="button" className={styles.pillButton} onClick={onOpenRegister}>
          <svg
            className={styles.btnIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <line x1="20" y1="8" x2="20" y2="14" />
            <line x1="23" y1="11" x2="17" y2="11" />
          </svg>
          <span className={styles.btnText}>Đăng ký</span>
        </button>

        <button type="button" className={styles.pillButton} onClick={onOpenLogin}>
          <svg
            className={styles.btnIcon}
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
          <span className={styles.btnText}>Đăng nhập</span>
        </button>
      </div>
    );
  }

  const isChoDuyet = user?.trangThaiDuyet === 'CHO_DUYET';
  const isDangTinDisabled = isChoDuyet || isSellerStatusLoading;
  const kyTuDaiDien = (user?.hoTen || user?.tenDangNhap || '').trim().charAt(0).toUpperCase();

  return (
    <div className={styles.actionsAuth}>
      <Link
        to="/thong-bao"
        className={styles.notificationButton}
        aria-label="Thông báo"
        title="Thông báo"
      >
        <svg
          className={styles.notificationIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        {coThongBao && <span className={styles.notificationDot} />}
      </Link>

      {showDangTin && (
        <div className={isDangTinDisabled ? styles.dangTinDisabledWrapper : undefined}>
          <button
            type="button"
            className={
              isDangTinDisabled
                ? `${styles.pillButton} ${styles.dangTinDisabled}`
                : styles.pillButton
            }
            onClick={isDangTinDisabled ? undefined : onDangTinClick}
            disabled={isDangTinDisabled}
            title={isDangTinDisabled ? undefined : 'Đăng tin bán bất động sản'}
            aria-disabled={isDangTinDisabled}
            aria-describedby={isChoDuyet ? choDuyetMessageId : undefined}
          >
            <span className={styles.plusSign}>+</span>
            <span className={styles.btnText}>Đăng tin</span>
          </button>
          {isChoDuyet && (
            <span id={choDuyetMessageId} className={styles.dangTinNote}>
              Tài khoản đang chờ Admin duyệt để đăng tin bán
            </span>
          )}
        </div>
      )}

      <div className={styles.userCapsuleWrapper}>
        <button
          ref={triggerRef}
          type="button"
          className={styles.userCapsule}
          onClick={onToggleAccountMenu}
          aria-expanded={isAccountMenuOpen}
          aria-haspopup="true"
        >
          <div className={styles.userAvatar}>{kyTuDaiDien}</div>
          <span className={styles.userName}>{user?.hoTen || user?.tenDangNhap || 'Tài khoản'}</span>
          <svg
            className={`${styles.chevronIcon} ${isAccountMenuOpen ? styles.chevronRotated : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        <AccountDropdown
          user={user}
          kyTuDaiDien={kyTuDaiDien}
          isOpen={isAccountMenuOpen}
          onClose={onCloseAccountMenu}
          onLogout={onLogout}
          triggerRef={triggerRef}
        />
      </div>
    </div>
  );
}
