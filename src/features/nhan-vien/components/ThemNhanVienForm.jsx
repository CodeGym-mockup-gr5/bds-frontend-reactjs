import { useRef } from 'react';
import {
  BriefcaseIcon,
  CalendarSmallIcon,
  CheckmarkSmallIcon,
  ChevronDownIcon,
  SolidWarningCircleIcon,
  UndoIcon,
  UserHeaderIcon,
} from './NhanVienIcons';
import styles from './ThemNhanVienForm.module.css';

const CHUC_VU_SELECT_OPTIONS = [
  { value: 'TRUONG_PHONG', label: 'Trưởng phòng' },
  { value: 'KE_TOAN', label: 'Kế toán' },
  { value: 'NHAN_VIEN', label: 'Nhân viên' },
];

export default function ThemNhanVienForm({
  formData,
  errors,
  touched,
  isSubmitting,
  generalError,
  setField,
  handleBlur,
  resetForm,
  cancel,
  submitForm,
}) {
  const dateInputRef = useRef(null);

  const showError = (name) => Boolean(touched[name] && errors[name]);

  const handleDateTrigger = () => {
    if (dateInputRef.current) {
      if (typeof dateInputRef.current.showPicker === 'function') {
        dateInputRef.current.showPicker();
      } else {
        dateInputRef.current.focus();
      }
    }
  };

  return (
    <form className={styles.formCard} onSubmit={submitForm} noValidate>
      {generalError && (
        <div className={styles.generalAlert} role="alert">
          <SolidWarningCircleIcon size={16} />
          <span>{generalError}</span>
        </div>
      )}

      {/* Card 1: Thông tin nhân viên */}
      <section aria-labelledby="section-employee-info">
        <div className={styles.sectionHeader}>
          <UserHeaderIcon className={styles.sectionIcon} size={22} />
          <h2 id="section-employee-info" className={styles.sectionTitle}>
            Thông tin nhân viên
          </h2>
        </div>

        <div className={styles.grid2Col}>
          {/* Mã nhân viên — do backend tự sinh, chỉ hiển thị, không cho nhập */}
          <div className={styles.field}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="field-maNv" className={styles.label}>
              Mã Nhân viên <span className={styles.requiredMark}>*</span>
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="field-maNv"
                name="maNv"
                type="text"
                className={`${styles.input} ${styles.inputReadOnly}`}
                placeholder="Hệ thống tự cấp phát"
                value=""
                readOnly
                aria-label="Mã nhân viên do hệ thống tự cấp phát"
              />
            </div>
          </div>

          {/* Họ và tên */}
          <div className={styles.field}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="field-hoTen" className={styles.label}>
              Họ và tên <span className={styles.requiredMark}>*</span>
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="field-hoTen"
                name="hoTen"
                type="text"
                className={`${styles.input} ${showError('hoTen') ? styles.inputError : ''}`}
                placeholder="VD: Nguyễn Văn A"
                value={formData.hoTen}
                onChange={(e) => setField('hoTen', e.target.value)}
                onBlur={() => handleBlur('hoTen')}
                aria-invalid={showError('hoTen')}
                aria-describedby={showError('hoTen') ? 'error-hoTen' : undefined}
              />
            </div>
            {showError('hoTen') && (
              <div id="error-hoTen" className={styles.errorRow}>
                <SolidWarningCircleIcon className={styles.errorIcon} size={14} />
                <span>{errors.hoTen}</span>
              </div>
            )}
          </div>

          {/* Ngày sinh */}
          <div className={styles.field}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="field-ngaySinh" className={styles.label}>
              Ngày sinh <span className={styles.requiredMark}>*</span>
            </label>
            <div className={styles.inputWrapper}>
              <input
                ref={dateInputRef}
                id="field-ngaySinh"
                name="ngaySinh"
                type="date"
                className={`${styles.input} ${styles.dateInput} ${showError('ngaySinh') ? styles.inputError : ''}`}
                placeholder="dd/MM/yyyy"
                value={formData.ngaySinh}
                onChange={(e) => setField('ngaySinh', e.target.value)}
                onBlur={() => handleBlur('ngaySinh')}
                aria-invalid={showError('ngaySinh')}
                aria-describedby={showError('ngaySinh') ? 'error-ngaySinh' : undefined}
              />
              <button
                type="button"
                className={styles.calendarButton}
                onClick={handleDateTrigger}
                tabIndex={-1}
                aria-hidden="true"
              >
                <CalendarSmallIcon size={16} />
              </button>
            </div>
            {showError('ngaySinh') && (
              <div id="error-ngaySinh" className={styles.errorRow}>
                <SolidWarningCircleIcon className={styles.errorIcon} size={14} />
                <span>{errors.ngaySinh}</span>
              </div>
            )}
          </div>

          {/* Giới tính */}
          <div className={styles.field}>
            <span className={styles.label}>
              Giới tính <span className={styles.requiredMark}>*</span>
            </span>
            <div
              className={styles.radioGroup}
              role="radiogroup"
              aria-label="Giới tính"
              aria-describedby={showError('gioiTinh') ? 'error-gioiTinh' : undefined}
            >
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="gioiTinh"
                  value="NAM"
                  checked={formData.gioiTinh === 'NAM'}
                  onChange={(e) => setField('gioiTinh', e.target.value)}
                  onBlur={() => handleBlur('gioiTinh')}
                  className={styles.radioInput}
                />
                <span>Nam</span>
              </label>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="gioiTinh"
                  value="NU"
                  checked={formData.gioiTinh === 'NU'}
                  onChange={(e) => setField('gioiTinh', e.target.value)}
                  onBlur={() => handleBlur('gioiTinh')}
                  className={styles.radioInput}
                />
                <span>Nữ</span>
              </label>
            </div>
            {showError('gioiTinh') && (
              <div id="error-gioiTinh" className={styles.errorRow}>
                <SolidWarningCircleIcon className={styles.errorIcon} size={14} />
                <span>{errors.gioiTinh}</span>
              </div>
            )}
          </div>

          {/* Địa chỉ - 2 cột */}
          <div className={`${styles.field} ${styles.colFull}`}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="field-diaChi" className={styles.label}>
              Địa chỉ <span className={styles.requiredMark}>*</span>
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="field-diaChi"
                name="diaChi"
                type="text"
                className={`${styles.input} ${showError('diaChi') ? styles.inputError : ''}`}
                placeholder="VD: 123 Đường ABC, Quận 1, TP. HCM"
                value={formData.diaChi}
                onChange={(e) => setField('diaChi', e.target.value)}
                onBlur={() => handleBlur('diaChi')}
                aria-invalid={showError('diaChi')}
                aria-describedby={showError('diaChi') ? 'error-diaChi' : undefined}
              />
            </div>
            {showError('diaChi') && (
              <div id="error-diaChi" className={styles.errorRow}>
                <SolidWarningCircleIcon className={styles.errorIcon} size={14} />
                <span>{errors.diaChi}</span>
              </div>
            )}
          </div>

          {/* Số điện thoại */}
          <div className={styles.field}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="field-soDienThoai" className={styles.label}>
              Số điện thoại <span className={styles.requiredMark}>*</span>
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="field-soDienThoai"
                name="soDienThoai"
                type="text"
                className={`${styles.input} ${showError('soDienThoai') ? styles.inputError : ''}`}
                placeholder="VD: 0912 345 678"
                value={formData.soDienThoai}
                onChange={(e) => setField('soDienThoai', e.target.value)}
                onBlur={() => handleBlur('soDienThoai')}
                aria-invalid={showError('soDienThoai')}
                aria-describedby={showError('soDienThoai') ? 'error-soDienThoai' : undefined}
              />
            </div>
            {showError('soDienThoai') && (
              <div id="error-soDienThoai" className={styles.errorRow}>
                <SolidWarningCircleIcon className={styles.errorIcon} size={14} />
                <span>{errors.soDienThoai}</span>
              </div>
            )}
          </div>

          {/* Email */}
          <div className={styles.field}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="field-email" className={styles.label}>
              Email <span className={styles.requiredMark}>*</span>
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="field-email"
                name="email"
                type="email"
                className={`${styles.input} ${showError('email') ? styles.inputError : ''}`}
                placeholder="VD: nguyenvana@congty.vn"
                value={formData.email}
                onChange={(e) => setField('email', e.target.value)}
                onBlur={() => handleBlur('email')}
                aria-invalid={showError('email')}
                aria-describedby={showError('email') ? 'error-email' : undefined}
              />
            </div>
            {showError('email') && (
              <div id="error-email" className={styles.errorRow}>
                <SolidWarningCircleIcon className={styles.errorIcon} size={14} />
                <span>{errors.email}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <hr className={styles.separator} />

      {/* Card 2: Chức vụ và phân quyền */}
      <section aria-labelledby="section-role-auth">
        <div className={styles.sectionHeader}>
          <BriefcaseIcon className={styles.sectionIcon} size={22} />
          <h2 id="section-role-auth" className={styles.sectionTitle}>
            Chức vụ và phân quyền
          </h2>
        </div>

        <div className={styles.grid2Col}>
          {/* Chức vụ */}
          <div className={styles.field}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="field-chucVu" className={styles.label}>
              Chức vụ <span className={styles.requiredMark}>*</span>
            </label>
            <div className={styles.selectWrapper}>
              <select
                id="field-chucVu"
                name="chucVu"
                className={`${styles.select} ${showError('chucVu') ? styles.selectError : ''}`}
                value={formData.chucVu}
                onChange={(e) => setField('chucVu', e.target.value)}
                onBlur={() => handleBlur('chucVu')}
                aria-invalid={showError('chucVu')}
                aria-describedby={showError('chucVu') ? 'error-chucVu' : undefined}
              >
                {CHUC_VU_SELECT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <span className={styles.selectArrow} aria-hidden="true">
                <ChevronDownIcon size={16} />
              </span>
            </div>
            {showError('chucVu') && (
              <div id="error-chucVu" className={styles.errorRow}>
                <SolidWarningCircleIcon className={styles.errorIcon} size={14} />
                <span>{errors.chucVu}</span>
              </div>
            )}
          </div>

          {/* Phân quyền */}
          <div className={styles.field}>
            <span className={styles.label}>
              Phân quyền <span className={styles.requiredMark}>*</span>
            </span>
            <div
              className={styles.radioGroup}
              role="radiogroup"
              aria-label="Phân quyền"
              aria-describedby={showError('laAdmin') ? 'error-laAdmin' : undefined}
            >
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="laAdmin"
                  value="true"
                  checked={formData.laAdmin === true || formData.laAdmin === 'true'}
                  onChange={() => setField('laAdmin', true)}
                  onBlur={() => handleBlur('laAdmin')}
                  className={styles.radioInput}
                />
                <span>Admin</span>
              </label>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="laAdmin"
                  value="false"
                  checked={formData.laAdmin === false || formData.laAdmin === 'false'}
                  onChange={() => setField('laAdmin', false)}
                  onBlur={() => handleBlur('laAdmin')}
                  className={styles.radioInput}
                />
                <span>Nhân viên</span>
              </label>
            </div>
            {showError('laAdmin') && (
              <div id="error-laAdmin" className={styles.errorRow}>
                <SolidWarningCircleIcon className={styles.errorIcon} size={14} />
                <span>{errors.laAdmin}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <hr className={styles.separator} />

      {/* Footer buttons */}
      <div className={styles.footer}>
        <button type="button" className={styles.btnSecondary} onClick={cancel}>
          <UndoIcon size={16} />
          <span>Hủy</span>
        </button>

        <div className={styles.footerRight}>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={resetForm}
            disabled={isSubmitting}
          >
            <UndoIcon size={16} />
            <span>Nhập lại</span>
          </button>
          <button type="submit" className={styles.btnPrimary} disabled={isSubmitting}>
            <CheckmarkSmallIcon size={16} />
            <span>{isSubmitting ? 'Đang lưu...' : 'Lưu nhân viên'}</span>
          </button>
        </div>
      </div>
    </form>
  );
}
