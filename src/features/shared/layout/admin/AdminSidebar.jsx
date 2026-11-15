import { Link, NavLink } from 'react-router-dom';
import logoColor from '../../../../assets/images/logo-color.png';
import Icon from '../../../../components/Icon';
import useAuth from '../../../../hooks/useAuth';
import ADMIN_MENU_ITEMS from './adminMenu';
import styles from './AdminSidebar.module.css';

function getRoleLabel(user) {
  return user?.laAdmin || user?.roles?.includes('ADMIN') ? 'Quản trị viên' : 'Nhân viên';
}

export default function AdminSidebar() {
  const { user, openLogoutModal } = useAuth();

  return (
    <aside className={styles.sidebar}>
      <Link to="/admin" className={styles.logoLink} aria-label="REALIA - Về trang quản trị">
        <img src={logoColor} alt="REALIA" className={styles.logo} />
      </Link>

      <nav className={styles.nav} aria-label="Menu quản trị">
        <ul className={styles.menu}>
          {ADMIN_MENU_ITEMS.map((item) => (
            <li key={item.key}>
              {item.to ? (
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive ? `${styles.item} ${styles.itemActive}` : styles.item
                  }
                >
                  <Icon name={item.icon} size={20} />
                  {item.label}
                </NavLink>
              ) : (
                <span className={`${styles.item} ${styles.itemDisabled}`} aria-disabled="true">
                  <Icon name={item.icon} size={20} />
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.account}>
        <div className={styles.accountInfo}>
          <Icon name="user" size={20} />
          <div>
            <p className={styles.accountName}>{user?.hoTen || 'Admin'}</p>
            <p className={styles.accountRole}>{getRoleLabel(user)}</p>
          </div>
        </div>
        <button type="button" className={styles.logoutButton} onClick={openLogoutModal}>
          <Icon name="logout" size={16} />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
