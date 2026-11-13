import { useId } from 'react';
import { ChevronDownIcon, FilterIcon, ResetIcon, SearchIcon } from '../../../components/Icons';
import { HUONG_OPTIONS, LOAI_BDS_OPTIONS, TU_KHOA_MAX_LENGTH, VI_TRI_OPTIONS } from '../constants';
import OptionGroup from './OptionGroup';
import RangeField from './RangeField';
import styles from './BatDongSanFilter.module.css';

function HuongSelect({ value, onChange }) {
  const selectId = useId();
  return (
    <label htmlFor={selectId} className={styles.selectField}>
      <span className={styles.label}>Hướng</span>
      <span className={styles.selectWrap}>
        <select
          id={selectId}
          className={styles.select}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          <option value="">Tất cả hướng</option>
          {HUONG_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon className={styles.selectIcon} />
      </span>
    </label>
  );
}

export default function BatDongSanFilter({ form }) {
  const { draft, errors, isExpanded } = form;
  const panelId = useId();

  const handleSubmit = (event) => {
    event.preventDefault();
    form.submit();
  };

  return (
    <form className={styles.filter} onSubmit={handleSubmit} noValidate>
      <div className={styles.searchRow}>
        <div className={styles.searchBox}>
          <SearchIcon size={20} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            type="search"
            value={draft.tuKhoa}
            maxLength={TU_KHOA_MAX_LENGTH}
            placeholder="Tìm theo mã bất động sản hoặc địa chỉ..."
            aria-label="Từ khóa tìm kiếm"
            onChange={(event) => form.setField('tuKhoa', event.target.value)}
          />
        </div>
        <button
          type="button"
          className={styles.toggleButton}
          onClick={form.toggleExpanded}
          aria-expanded={isExpanded}
          aria-controls={panelId}
        >
          <FilterIcon />
          <span>Bộ lọc</span>
          <ChevronDownIcon className={isExpanded ? styles.chevronUp : ''} />
        </button>
        <button type="submit" className={styles.submitButton}>
          <SearchIcon />
          Tìm kiếm
        </button>
      </div>

      {isExpanded && (
        <div id={panelId} className={styles.panel}>
          <div className={styles.rangeRow}>
            <RangeField
              label="Diện tích"
              unit="m²"
              hint="Nhập diện tích tối thiểu và tối đa."
              from={{
                value: draft.dienTichTu,
                onChange: (v) => form.setNumberField('dienTichTu', v),
              }}
              to={{
                value: draft.dienTichDen,
                onChange: (v) => form.setNumberField('dienTichDen', v),
              }}
              error={errors.dienTich}
              onBlur={() => form.touchRange('dienTich')}
            />
            <RangeField
              label="Giá tiền (triệu đồng)"
              unit="triệu đồng"
              hint="Đơn vị nhập: triệu đồng (1 tỷ = 1.000 triệu)."
              from={{ value: draft.giaTu, onChange: (v) => form.setNumberField('giaTu', v) }}
              to={{ value: draft.giaDen, onChange: (v) => form.setNumberField('giaDen', v) }}
              error={errors.gia}
              onBlur={() => form.touchRange('gia')}
            />
          </div>
          <div className={styles.optionRow}>
            <OptionGroup
              label="Loại bất động sản"
              options={LOAI_BDS_OPTIONS}
              value={draft.loaiBds}
              onChange={(value) => form.setField('loaiBds', value)}
            />
            <OptionGroup
              label="Vị trí"
              options={VI_TRI_OPTIONS}
              value={draft.viTri}
              onChange={(value) => form.setField('viTri', value)}
            />
            <HuongSelect value={draft.huong} onChange={(value) => form.setField('huong', value)} />
          </div>
          <div className={styles.panelFooter}>
            <span className={styles.note}>Kết quả đáp ứng đồng thời các điều kiện đã chọn.</span>
            <div className={styles.footerActions}>
              <button type="button" className={styles.linkButton} onClick={form.reset}>
                <ResetIcon size={14} />
                Đặt lại
              </button>
              <button type="button" className={styles.linkButton} onClick={form.toggleExpanded}>
                Thu gọn
                <ChevronDownIcon size={14} className={styles.chevronUp} />
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
