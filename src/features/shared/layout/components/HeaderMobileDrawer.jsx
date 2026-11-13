import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from '../Header.module.css';

export default function HeaderMobileDrawer({ isOpen, items, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={styles.mobileMenuDrawer}>
      <ul className={styles.mobileNavList}>
        {items.map((item) => (
          <li key={item.duongDan} className={styles.mobileNavItem}>
            <NavLink
              to={item.duongDan}
              onClick={onClose}
              className={({ isActive }) =>
                isActive
                  ? `${styles.mobileNavLink} ${styles.mobileNavLinkActive}`
                  : styles.mobileNavLink
              }
            >
              {item.nhan}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

HeaderMobileDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      nhan: PropTypes.string.isRequired,
      duongDan: PropTypes.string.isRequired,
    }),
  ),
  onClose: PropTypes.func.isRequired,
};

HeaderMobileDrawer.defaultProps = {
  items: [],
};
