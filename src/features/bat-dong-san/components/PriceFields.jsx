import { formatPricePerM2 } from '../../../utils/format';
import { GHI_CHU_MAX_LENGTH } from '../constants/batDongSanOptions';
import useDigitCaret from '../hooks/useDigitCaret';
import { computePricePerM2, formatPriceInput } from '../utils/dangTinValidation';
import TextField from './TextField';
import styles from './DangTinForm.module.css';

export default function PriceFields({ values, errors, onChange, onBlur }) {
  const pricePerM2 = computePricePerM2(values);
  const giaCaret = useDigitCaret();

  const handleGiaChange = (name, value) => {
    giaCaret.captureCaret();
    onChange(name, value);
  };

  return (
    <>
      <div className={styles.twoColumns}>
        <TextField
          name="dienTich"
          label="Diện tích (m²)"
          required
          inputMode="decimal"
          placeholder="VD: 85"
          suffix="m²"
          value={values.dienTich}
          error={errors.dienTich}
          onChange={onChange}
          onBlur={onBlur}
        />
        <TextField
          name="gia"
          label="Giá (VNĐ)"
          required
          inputMode="numeric"
          placeholder="VD: 3.500.000.000"
          suffix="VNĐ"
          value={formatPriceInput(values.gia)}
          error={errors.gia}
          inputRef={giaCaret.inputRef}
          onChange={handleGiaChange}
          onBlur={onBlur}
        />
      </div>
      <TextField
        name="giaTrenM2"
        label="Giá/m²"
        readOnly
        hint="Tự tính từ giá và diện tích"
        placeholder="Nhập giá và diện tích để tính"
        value={pricePerM2 === null ? '' : formatPricePerM2(pricePerM2)}
      />
      <TextField
        name="ghiChu"
        label="Ghi chú"
        multiline
        showCounter
        placeholder="VD: Gần chợ, đường ô tô"
        maxLength={GHI_CHU_MAX_LENGTH}
        value={values.ghiChu}
        error={errors.ghiChu}
        onChange={onChange}
        onBlur={onBlur}
      />
    </>
  );
}
