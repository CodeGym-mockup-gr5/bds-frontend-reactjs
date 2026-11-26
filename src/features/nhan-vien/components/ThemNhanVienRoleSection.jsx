import { BriefcaseIcon, ChevronDownIcon, SolidWarningCircleIcon } from './NhanVienIcons';
import { CHUC_VU_LABEL_MAP } from '../constants/nhanVienConstants';

export default function ThemNhanVienRoleSection({
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
          Chức vụ
        </h2>
      </div>

      <div className={styles.grid2Col}>
        {/* Chức vụ */}
        <div className={styles.field}>
          <label htmlFor="field-chucVu" className={styles.label}>
            <span className={styles.labelRow}>
              <span>
                Chức vụ <span className={styles.requiredMark}>*</span>
              </span>
              {showError('chucVu') && (
                <span id="error-chucVu" className={styles.errorMessage} aria-live="polite">
                  <SolidWarningCircleIcon className={styles.errorIcon} size={14} />
                  <span>{errors.chucVu}</span>
                </span>
              )}
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
                <option value="" disabled>
                  -- Chọn chức vụ --
                </option>
                {Object.entries(CHUC_VU_LABEL_MAP).map(([val, label]) => (
                  <option key={val} value={val}>
                    {label}
                  </option>
                ))}
              </select>
              <span className={styles.selectArrow} aria-hidden="true">
                <ChevronDownIcon size={16} />
              </span>
            </span>
          </label>
        </div>
      </div>
    </section>
  );
}
