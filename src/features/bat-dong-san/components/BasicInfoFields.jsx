import { LOAI_BDS_OPTIONS, PHAP_LY_MAX_LENGTH } from '../constants/batDongSanOptions';
import PillRadioGroup from './PillRadioGroup';
import TextField from './TextField';

export default function BasicInfoFields({ values, errors, onChange, onBlur }) {
  return (
    <>
      <PillRadioGroup
        name="loaiBds"
        label="Loại bất động sản"
        required
        value={values.loaiBds}
        options={LOAI_BDS_OPTIONS}
        error={errors.loaiBds}
        onChange={onChange}
        onBlur={onBlur}
      />
      <TextField
        name="phapLy"
        label="Pháp lý"
        hint="Không bắt buộc"
        placeholder="VD: Sổ hồng chính chủ"
        value={values.phapLy}
        maxLength={PHAP_LY_MAX_LENGTH}
        showCounter
        error={errors.phapLy}
        onChange={onChange}
        onBlur={onBlur}
      />
    </>
  );
}
