import { BriefcaseIcon, ChevronDownIcon, SolidWarningCircleIcon } from './NhanVienIcons';
import { CHUC_VU_SELECT_OPTIONS } from '../constants/nhanVienConstants';

export default function SuaNhanVienRoleSection({
  formData,
  errors,
  touched,
  setField,
  handleBlur,
  styles,
}) {
  const showError = (name) => Boolean(touched[name] && errors[name]);

  return (
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
          <label htmlFor="field-chucVu" className={styles.label}>
            <span>
              Chức vụ <span className={styles.requiredMark}>*</span>
            </span>
            <span className={styles.selectWrapper}>
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
            </span>
          </label>
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
            <label htmlFor="field-laAdmin-true" className={styles.radioLabel}>
              <input
                id="field-laAdmin-true"
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
            <label htmlFor="field-laAdmin-false" className={styles.radioLabel}>
              <input
                id="field-laAdmin-false"
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
  );
}
