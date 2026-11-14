import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useNhanVienProfile from '../hooks/useNhanVienProfile';
import { WarningCircleIcon } from '../components/ProfileIcons';
import SuaThongTinCaNhanForm from '../components/SuaThongTinCaNhanForm';
import SuaThongTinCaNhanSkeleton from '../components/SuaThongTinCaNhanSkeleton';
import styles from './SuaThongTinCaNhanPage.module.css';

export default function SuaThongTinCaNhanPage() {
  const { showToast } = useAuth();
  const { profile, isLoading, isError, error, refetch, updateProfileAsync, isSubmitting } =
    useNhanVienProfile();

  const formKey = profile
    ? [
        profile.id,
        profile.hoTen,
        profile.ngaySinh,
        profile.gioiTinh,
        profile.diaChi,
        profile.soDienThoai,
        profile.email,
      ].join('|')
    : 'empty';

  const errorMessage =
    error?.response?.data?.message || 'Không thể tải thông tin cá nhân lúc này. Vui lòng thử lại.';

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
        <span className={styles.breadcrumbCurrent}>Sửa thông tin cá nhân</span>
      </nav>

      <div className={styles.mainCard}>
        <div className={styles.cardHeader}>
          <div>
            <h1 className={styles.pageTitle}>Sửa thông tin cá nhân</h1>
            <p className={styles.pageSubtitle}>
              Cập nhật và hoàn thiện thông tin hồ sơ cá nhân của bạn trên hệ thống REALIA.
            </p>
          </div>
        </div>

        {isLoading && <SuaThongTinCaNhanSkeleton />}

        {!isLoading && isError && (
          <div className={styles.fetchErrorBox} role="alert">
            <div className={styles.fetchErrorRow}>
              <WarningCircleIcon className={styles.bannerIcon} />
              <span>{errorMessage}</span>
            </div>
            <button type="button" className={styles.retryButton} onClick={() => refetch()}>
              Thử lại
            </button>
          </div>
        )}

        {!isLoading && !isError && profile && (
          <SuaThongTinCaNhanForm
            key={formKey}
            profile={profile}
            isSubmitting={isSubmitting}
            onSubmitProfile={updateProfileAsync}
            onShowToast={showToast}
          />
        )}
      </div>
    </section>
  );
}
