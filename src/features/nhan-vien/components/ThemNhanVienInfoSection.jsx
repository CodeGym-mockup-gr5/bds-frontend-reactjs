import { SolidWarningCircleIcon, UserHeaderIcon } from './NhanVienIcons';

export default function ThemNhanVienInfoSection({
  formData,
  errors,
  touched,
  setField,
  handleBlur,
  styles,
}) {
  const showError = (name) => Boolean(touched[name] && errors[name]);

  return (
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
          <label htmlFor="field-maNv" className={styles.label}>
            Mã Nhân viên
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
          <label htmlFor="field-hoTen" className={styles.label}>
            Họ và tên <span className={styles.requiredMark}>*</span>
          </label>
          <div className={styles.inputWrapper}>
            <input
              id="field-hoTen"
              name="hoTen"
              type="text"
              maxLength={45}
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
          <label htmlFor="field-ngaySinh" className={styles.label}>
            Ngày sinh <span className={styles.requiredMark}>*</span>
          </label>
          <div className={styles.inputWrapper}>
            <input
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
          <label htmlFor="field-diaChi" className={styles.label}>
            Địa chỉ <span className={styles.requiredMark}>*</span>
          </label>
          <div className={styles.inputWrapper}>
            <input
              id="field-diaChi"
              name="diaChi"
              type="text"
              maxLength={255}
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
          <label htmlFor="field-email" className={styles.label}>
            Email <span className={styles.requiredMark}>*</span>
          </label>
          <div className={styles.inputWrapper}>
            <input
              id="field-email"
              name="email"
              type="email"
              maxLength={254}
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
  );
}
