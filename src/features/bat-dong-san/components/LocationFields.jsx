import { DIA_CHI_MAX_LENGTH, HUONG_OPTIONS, VI_TRI_OPTIONS } from '../constants/batDongSanOptions';
import SelectField from './SelectField';
import TextField from './TextField';
import styles from './DangTinForm.module.css';

export default function LocationFields({ values, errors, onChange, onBlur }) {
  return (
    <>
      <TextField
        name="diaChi"
        label="Địa chỉ"
        required
        placeholder="VD: 12 Nguyễn Huệ, Phường Bến Nghé, Quận 1"
        value={values.diaChi}
        maxLength={DIA_CHI_MAX_LENGTH}
        error={errors.diaChi}
        onChange={onChange}
        onBlur={onBlur}
      />
      <div className={styles.twoColumns}>
        <SelectField
          name="viTri"
          label="Vị trí"
          required
          placeholder="Chọn vị trí"
          value={values.viTri}
          options={VI_TRI_OPTIONS}
          error={errors.viTri}
          onChange={onChange}
          onBlur={onBlur}
        />
        <SelectField
          name="huong"
          label="Hướng"
          required
          placeholder="Chọn hướng"
          value={values.huong}
          options={HUONG_OPTIONS}
          error={errors.huong}
          onChange={onChange}
          onBlur={onBlur}
        />
      </div>
    </>
  );
}
