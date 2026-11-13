import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from '../Header.module.css';

const DEFAULT_ITEMS = [
  { nhan: 'Mua bán', duongDan: '/bat-dong-san' },
  { nhan: 'Dự án', duongDan: '/du-an' },
  { nhan: 'Hỗ trợ', duongDan: '/ho-tro' },
];

export default function HeaderNav({ items = DEFAULT_ITEMS, onItemClick = null }) {
  const menuList = items && items.length > 0 ? items : DEFAULT_ITEMS;

  return (
    <nav className={styles.nav} aria-label="Điều hướng chính">
      <ul className={styles.navList}>
        {menuList.map((item) => (
          <li key={item.duongDan} className={styles.navItem}>
            <NavLink
              to={item.duongDan}
              onClick={onItemClick}
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

HeaderNav.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      nhan: PropTypes.string.isRequired,
      duongDan: PropTypes.string.isRequired,
    }),
  ),
  onItemClick: PropTypes.func,
};

HeaderNav.defaultProps = {
  items: DEFAULT_ITEMS,
  onItemClick: null,
};
