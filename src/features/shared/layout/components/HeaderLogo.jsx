import { Link } from 'react-router-dom';
import logoWhite from '../../../../assets/images/logo-white.png';
import styles from '../Header.module.css';

export default function HeaderLogo() {
  return (
    <Link to="/" className={styles.logoLink} aria-label="REALIA - Về trang chủ">
      <img src={logoWhite} alt="REALIA" className={styles.logoImage} />
    </Link>
  );
}
