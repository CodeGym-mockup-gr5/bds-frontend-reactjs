import { useCallback, useRef, useState } from 'react';
import Icon from '../../../../components/Icon';
import useAuth from '../../../../hooks/useAuth';
import { getAvatarInitial } from '../../../../utils/auth';
import AccountDropdown from '../components/AccountDropdown';
import styles from '../Header.module.css';

export default function AdminAccountMenu() {
  const { user, openLogoutModal } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef(null);

  const kyTuDaiDien = user?.kyTuDaiDien || getAvatarInitial(user);

  const handleClose = useCallback(() => setIsOpen(false), []);
  const handleToggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const handleLogout = useCallback(() => {
    setIsOpen(false);
    openLogoutModal();
  }, [openLogoutModal]);

  return (
    <div className={styles.userCapsuleWrapper}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.userCapsule}
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className={styles.userAvatar}>{kyTuDaiDien}</span>
        <span className={styles.userName}>{user?.hoTen || user?.tenDangNhap || 'Tài khoản'}</span>
        <Icon
          name="chevronDown"
          className={`${styles.chevronIcon} ${isOpen ? styles.chevronRotated : ''}`}
        />
      </button>

      <AccountDropdown
        user={user}
        kyTuDaiDien={kyTuDaiDien}
        isOpen={isOpen}
        onClose={handleClose}
        onLogout={handleLogout}
        triggerRef={triggerRef}
        showWorkspaceLink={false}
      />
    </div>
  );
}
