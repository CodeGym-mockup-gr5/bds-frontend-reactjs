import useSuaThongTinForm from '../hooks/useSuaThongTinForm';
import { formatChucVu } from '../utils/profileValidation';
import { AlertTriangleIcon, CheckIcon, WarningCircleIcon } from './ProfileIcons';
import { GenderRadioField, LockedCodeField } from './ProfileExtraFields';
import ProfileTextField from './ProfileTextField';
import styles from '../pages/SuaThongTinCaNhanPage.module.css';

export default function SuaThongTinCaNhanForm({
  profile,
  isSubmitting = false,
  onSubmitProfile,
  onShowToast = null,
}) {
  const {
    values,
    errors,
    errorCount,
    serverError,
    handleChange,
    handleBlur,
    handleReset,
    handleSubmit,
  } = useSuaThongTinForm({ profile, onSubmitProfile, onShowToast });

  const hasErrors = errorCount > 0;

  return (
    <>
      {(hasErrors || serverError) && (
        <div className={styles.errorBanner} role="alert">
          <div className={styles.errorBannerContent}>
            <WarningCircleIcon className={styles.bannerIcon} />
            <span>
              {serverError ||
                'Xin mời kiểm tra lại các trường thông tin có viền đỏ bên dưới trước khi lưu.'}
            </span>
          </div>
          {hasErrors && (
            <span className={styles.errorSummaryBadge} role="status">
              <AlertTriangleIcon className={styles.badgeIcon} />
              <span>{`Có ${errorCount} trường cần sửa`}</span>
            </span>
          )}
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <LockedCodeField
          label="Mã nhân viên"
          value={profile?.maNv || ''}
          hint="Mã định danh nội bộ không thể thay đổi"
        />

        <ProfileTextField
          label="Họ và tên"
          name="hoTen"
          value={values.hoTen}
          required
          disabled={isSubmitting}
          error={errors.hoTen}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <div className={styles.twoColGrid}>
          <ProfileTextField
            label="Ngày sinh"
            name="ngaySinh"
            type="date"
            value={values.ngaySinh}
            required
            disabled={isSubmitting}
            error={errors.ngaySinh}
            showErrorIcon={false}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <GenderRadioField
            value={values.gioiTinh}
            error={errors.gioiTinh}
            disabled={isSubmitting}
            onChange={handleChange}
          />
        </div>

        <ProfileTextField
          label="Địa chỉ"
          name="diaChi"
          placeholder="Nhập địa chỉ thường trú/liên hệ"
          value={values.diaChi}
          required
          disabled={isSubmitting}
          error={errors.diaChi}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        <div className={styles.twoColGrid}>
          <ProfileTextField
            label="Số điện thoại"
            name="soDienThoai"
            type="tel"
            value={values.soDienThoai}
            required
            disabled={isSubmitting}
            error={errors.soDienThoai}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <ProfileTextField
            label="Email"
            name="email"
            type="email"
            value={values.email}
            required
            disabled={isSubmitting}
            error={errors.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>

        <LockedCodeField
          label="Chức vụ"
          value={formatChucVu(profile?.chucVu)}
          hint="Chức vụ do Quản trị viên quản lý"
        />

        <div className={styles.formFooter}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={handleReset}
            disabled={isSubmitting}
          >
            Hủy
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting || hasErrors}
          >
            {isSubmitting ? (
              <span className={styles.spinner} aria-hidden="true" />
            ) : (
              <CheckIcon className={styles.btnCheckIcon} />
            )}
            <span>{isSubmitting ? 'Đang lưu...' : 'Lưu thông tin'}</span>
          </button>
        </div>
      </form>
    </>
  );
}
