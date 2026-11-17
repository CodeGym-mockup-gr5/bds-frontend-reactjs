import { Link, NavLink } from 'react-router-dom';
import logoColor from '../../../../assets/images/logo-color.png';
import Icon from '../../../../components/Icon';
import ADMIN_MENU_ITEMS from './adminMenu';
import styles from './AdminSidebar.module.css';

export default function AdminSidebar() {
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
    </aside>
  );
}
