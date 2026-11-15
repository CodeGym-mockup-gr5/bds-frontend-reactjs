import { CHUC_VU_OPTIONS } from '../constants/nhanVienConstants';
import { ChevronDownIcon, SearchIcon } from './NhanVienIcons';
import styles from './NhanVienFilterCard.module.css';

export default function NhanVienFilterCard({ filter, onChange, onSubmit }) {
  return (
    <div className={styles.filterCard}>
      <form className={styles.filterForm} onSubmit={onSubmit} role="search">
        <label htmlFor="filter-maNv" className={styles.field}>
          <span className={styles.label}>Mã NV</span>
          <input
            id="filter-maNv"
            type="text"
            className={styles.input}
            placeholder="MNV-001"
            value={filter.maNv}
            onChange={(e) => onChange('maNv', e.target.value)}
          />
        </label>

        <label htmlFor="filter-tenNv" className={styles.field}>
          <span className={styles.label}>Tên NV</span>
          <input
            id="filter-tenNv"
            type="text"
            className={styles.input}
            placeholder="Tìm theo tên"
            value={filter.tenNv}
            onChange={(e) => onChange('tenNv', e.target.value)}
          />
        </label>

        <label htmlFor="filter-chucVu" className={styles.field}>
          <span className={styles.label}>Chức vụ</span>
          <div className={styles.selectWrapper}>
            <select
              id="filter-chucVu"
              className={styles.select}
              value={filter.chucVu}
              onChange={(e) => onChange('chucVu', e.target.value)}
            >
              {CHUC_VU_OPTIONS.map((opt) => (
                <option key={opt.value || 'all'} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDownIcon className={styles.selectArrow} size={16} />
          </div>
        </label>

        <label htmlFor="filter-email" className={styles.field}>
          <span className={styles.label}>Email</span>
          <input
            id="filter-email"
            type="text"
            className={styles.input}
            placeholder="Tìm theo email"
            value={filter.email}
            onChange={(e) => onChange('email', e.target.value)}
          />
        </label>

        <button type="submit" className={styles.searchButton}>
          <SearchIcon size={16} />
          <span>Tìm kiếm</span>
        </button>
      </form>
    </div>
  );
}
