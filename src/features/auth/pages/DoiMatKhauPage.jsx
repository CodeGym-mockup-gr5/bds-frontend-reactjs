import { Link, useNavigate } from 'react-router-dom';
import ChangePasswordForm from '../components/ChangePasswordForm';
import styles from './DoiMatKhauPage.module.css';

export default function DoiMatKhauPage() {
  const navigate = useNavigate();

  const handleExit = () => {
    navigate('/thong-tin-ca-nhan');
  };

  return (
    <section className={styles.pageSection}>
      <nav className={styles.breadcrumb} aria-label="Breadcrumb">
        <Link to="/" className={styles.breadcrumbLink}>
          Trang chủ
        </Link>
        <span className={styles.breadcrumbSeparator} aria-hidden="true">
          &gt;
        </span>
        <span>Tài khoản</span>
        <span className={styles.breadcrumbSeparator} aria-hidden="true">
          &gt;
        </span>
        <span className={styles.breadcrumbCurrent}>Đổi mật khẩu</span>
      </nav>

      <div className={styles.mainCard}>
        <header className={styles.cardHeader}>
          <h1 className={styles.pageTitle}>Đổi mật khẩu</h1>
          <p className={styles.pageSubtitle}>
            Mật khẩu mới gồm 6 đến 32 ký tự và không chứa khoảng trắng.
          </p>
        </header>

        <ChangePasswordForm onExit={handleExit} />
      </div>
    </section>
  );
}
