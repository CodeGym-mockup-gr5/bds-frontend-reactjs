import { useId } from 'react';
import { formatPhone } from '../../../utils/format';
import styles from './DangTinSidebar.module.css';

function buildRows(nguoiDang) {
  if (!nguoiDang) return [];
  return [
    { key: 'hoTen', label: 'Họ tên', value: nguoiDang.hoTen },
    { key: 'maKh', label: 'Mã khách hàng', value: nguoiDang.maKh },
    { key: 'soDienThoai', label: 'Số điện thoại', value: formatPhone(nguoiDang.soDienThoai) },
  ].filter((row) => Boolean(row.value));
}

export default function NguoiDangCard({ nguoiDang = null }) {
  const titleId = useId();
  const rows = buildRows(nguoiDang);

  return (
    <section className={styles.card} aria-labelledby={titleId}>
      <h2 id={titleId} className={styles.cardTitle}>
        Người đăng
      </h2>
      {rows.length > 0 ? (
        <dl className={styles.infoList}>
          {rows.map((row) => (
            <div key={row.key} className={styles.infoRow}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className={styles.muted}>Thông tin người đăng được lấy tự động từ tài khoản của bạn.</p>
      )}
    </section>
  );
}
