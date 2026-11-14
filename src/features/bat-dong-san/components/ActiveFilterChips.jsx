import { CloseIcon } from '../../../components/Icons';
import { formatArea, formatCurrency } from '../../../utils/format';
import {
  HUONG_OPTIONS,
  LOAI_BDS_OPTIONS,
  VI_TRI_OPTIONS,
  getOptionLabel,
} from '../constants/batDongSanOptions';
import styles from './ActiveFilterChips.module.css';

function formatRange(from, to, format) {
  if (from && to) {
    return `${format(from)} – ${format(to)}`;
  }
  return from ? `Từ ${format(from)}` : `Đến ${format(to)}`;
}

function buildChips(filters) {
  const chips = [];
  if (filters.tuKhoa) {
    chips.push({ id: 'tuKhoa', label: `“${filters.tuKhoa}”`, keys: ['tuKhoa'] });
  }
  if (filters.dienTichTu || filters.dienTichDen) {
    chips.push({
      id: 'dienTich',
      label: formatRange(filters.dienTichTu, filters.dienTichDen, formatArea),
      keys: ['dienTichTu', 'dienTichDen'],
    });
  }
  if (filters.giaTu || filters.giaDen) {
    chips.push({
      id: 'gia',
      label: formatRange(filters.giaTu, filters.giaDen, formatCurrency),
      keys: ['giaTu', 'giaDen'],
    });
  }
  if (filters.loaiBds) {
    const label = getOptionLabel(LOAI_BDS_OPTIONS, filters.loaiBds);
    chips.push({ id: 'loaiBds', label, keys: ['loaiBds'] });
  }
  if (filters.viTri) {
    const label = getOptionLabel(VI_TRI_OPTIONS, filters.viTri);
    chips.push({ id: 'viTri', label, keys: ['viTri'] });
  }
  if (filters.huong) {
    const label = `Hướng ${getOptionLabel(HUONG_OPTIONS, filters.huong)}`;
    chips.push({ id: 'huong', label, keys: ['huong'] });
  }
  return chips;
}

export default function ActiveFilterChips({ filters, onRemove, onClear }) {
  const chips = buildChips(filters);
  if (!chips.length) {
    return null;
  }

  return (
    <div className={styles.wrap}>
      <span className={styles.label}>Đang lọc:</span>
      <ul className={styles.list}>
        {chips.map((chip) => (
          <li key={chip.id}>
            <button
              type="button"
              className={styles.chip}
              onClick={() => onRemove(chip.keys)}
              aria-label={`Bỏ bộ lọc ${chip.label}`}
            >
              {chip.label}
              <CloseIcon size={14} />
            </button>
          </li>
        ))}
      </ul>
      <button type="button" className={styles.clear} onClick={onClear}>
        Xóa bộ lọc
      </button>
    </div>
  );
}
