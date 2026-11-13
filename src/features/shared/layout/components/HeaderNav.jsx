import { NavLink } from 'react-router-dom';
import styles from '../Header.module.css';

export default function HeaderNav({ items }) {
  return (
    <nav className={styles.nav} aria-label="Điều hướng chính">
      <ul className={styles.navList}>
        {items.map((item) => (
          <li key={item.duongDan} className={styles.navItem}>
            <NavLink
              to={item.duongDan}
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
              }
            >
              {item.nhan}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
