import { NavLink } from 'react-router-dom';
import styles from './AccountTabs.module.css';

const TABS = [
  { to: '/tin-dang-cua-toi', label: 'Tin đăng' },
  { to: '/nhu-cau-cua-toi', label: 'Nhu cầu' },
];

export default function AccountTabs() {
  return (
    <nav className={styles.tabs} aria-label="Mục cá nhân">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) => `${styles.tab} ${isActive ? styles.tabActive : ''}`}
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}
