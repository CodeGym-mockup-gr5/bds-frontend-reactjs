import StatusBadge from '../../../components/StatusBadge';
import { formatArea, formatCurrency, formatDate, formatPricePerM2 } from '../../../utils/format';
import {
  HUONG_OPTIONS,
  LOAI_BDS_OPTIONS,
  VI_TRI_OPTIONS,
  getOptionLabel,
} from '../constants/batDongSanOptions';
import styles from './DetailBlock.module.css';

const EMPTY_VALUE = 'Chưa cập nhật';

function buildRows(batDongSan) {
  return [
    { id: 'maBds', label: 'Mã BĐS', value: batDongSan.maBds },
    {
      id: 'loaiBds',
      label: 'Loại BĐS',
      value: getOptionLabel(LOAI_BDS_OPTIONS, batDongSan.loaiBds),
    },
    { id: 'diaChi', label: 'Địa chỉ', value: batDongSan.diaChi },
    { id: 'viTri', label: 'Vị trí', value: getOptionLabel(VI_TRI_OPTIONS, batDongSan.viTri) },
    { id: 'huong', label: 'Hướng', value: getOptionLabel(HUONG_OPTIONS, batDongSan.huong) },
    { id: 'dienTich', label: 'Diện tích', value: formatArea(batDongSan.dienTich) },
    { id: 'gia', label: 'Giá kỳ vọng', value: formatCurrency(batDongSan.gia) },
    { id: 'giaM2', label: 'Đơn giá', value: formatPricePerM2(batDongSan.giaM2) },
    { id: 'phapLy', label: 'Pháp lý', value: batDongSan.phapLy },
    {
      id: 'tinhTrang',
      label: 'Tình trạng',
      value: batDongSan.tinhTrang && <StatusBadge tinhTrang={batDongSan.tinhTrang} />,
    },
    { id: 'ngayDang', label: 'Ngày đăng', value: formatDate(batDongSan.ngayDang) },
    { id: 'ghiChu', label: 'Ghi chú', value: batDongSan.ghiChu },
  ];
}

export default function ThongTinChiTiet({ batDongSan }) {
  return (
    <section className={styles.block} aria-labelledby="dac-diem-bds">
      <h2 id="dac-diem-bds" className={styles.title}>
        Đặc điểm bất động sản
      </h2>
      <dl className={styles.list}>
        {buildRows(batDongSan).map((row) => (
          <div key={row.id} className={styles.row}>
            <dt className={styles.label}>{row.label}</dt>
            <dd className={`${styles.value} ${row.value ? '' : styles.empty}`}>
              {row.value || EMPTY_VALUE}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
