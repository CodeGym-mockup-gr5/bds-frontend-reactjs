import { useId } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../../../../hooks/useAuth';
import {
  ACCOUNT_MENU_ACTIONS,
  ACCOUNT_MENU_ITEMS,
  isAccountMenuItemActive,
} from '../constants/accountMenu';
import AccountMenuIcon from './AccountMenuIcon';
import styles from './AccountSidebar.module.css';

export default function AccountSidebar() {
  const { pathname } = useLocation();
  const { openLogoutModal } = useAuth();
  const supportTitleId = useId();

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.card} aria-label="Menu tài khoản">
        <ul className={styles.menu}>
          {ACCOUNT_MENU_ITEMS.map((item) => {
            if (item.action === ACCOUNT_MENU_ACTIONS.LOGOUT) {
              return (
                <li key={item.key}>
                  <button type="button" className={styles.menuItem} onClick={openLogoutModal}>
                    <AccountMenuIcon name={item.icon} className={styles.menuIcon} />
                    {item.label}
                  </button>
                </li>
              );
            }

            const isActive = isAccountMenuItemActive(item, pathname);
            return (
              <li key={item.key}>
                <Link
                  to={item.to}
                  className={`${styles.menuItem} ${isActive ? styles.menuItemActive : ''}`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <AccountMenuIcon name={item.icon} className={styles.menuIcon} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <section className={`${styles.card} ${styles.support}`} aria-labelledby={supportTitleId}>
        <p id={supportTitleId} className={styles.supportTitle}>
          Cần hỗ trợ?
        </p>
        <p className={styles.supportText}>Liên hệ trung tâm để được tư vấn và hỗ trợ.</p>
        <Link to="/ho-tro" className={styles.supportLink}>
          Xem trang Hỗ trợ
        </Link>
      </section>
    </aside>
  );
}
