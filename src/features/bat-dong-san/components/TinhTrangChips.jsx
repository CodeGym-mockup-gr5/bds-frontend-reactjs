import { TINH_TRANG_OPTIONS } from '../constants';
import styles from './TinhTrangChips.module.css';

const MOI_DANG_ID = 'moiDang';

export default function TinhTrangChips({
  value,
  counts,
  moiDang,
  showMoiDang,
  onSelect,
  onMoiDang,
}) {
  const chips = [{ value: '', label: 'Tất cả' }, ...TINH_TRANG_OPTIONS].map((option) => ({
    id: option.value || 'all',
    label: option.label,
    count: counts[option.value],
    isSelected: !moiDang && option.value === value,
    onClick: () => onSelect(option.value),
  }));

  if (showMoiDang) {
    chips.push({
      id: MOI_DANG_ID,
      label: 'Mới đăng',
      isSelected: moiDang,
      onClick: onMoiDang,
    });
  }

  return (
    <div className={styles.chips} role="group" aria-label="Lọc theo tình trạng">
      {chips.map((chip) => (
        <button
          key={chip.id}
          type="button"
          className={`${styles.chip} ${chip.isSelected ? styles.selected : ''}`}
          aria-pressed={chip.isSelected}
          onClick={chip.onClick}
        >
          {chip.label}
          {chip.count !== undefined && ` · ${chip.count}`}
        </button>
      ))}
    </div>
  );
}
