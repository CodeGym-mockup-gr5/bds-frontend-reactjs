import { formatPhone } from '../../../utils/format';
import styles from './DetailBlock.module.css';

export default function ChuSoHuuCard({ chuSoHuu }) {
  if (!chuSoHuu) {
    return null;
  }

  const rows = [
    { id: 'maKh', label: 'Mã KH', value: chuSoHuu.maKh },
    { id: 'hoTen', label: 'Họ tên', value: chuSoHuu.hoTen },
    { id: 'soDienThoai', label: 'Số điện thoại', value: formatPhone(chuSoHuu.soDienThoai) },
  ].filter((row) => row.value);

  if (!rows.length) {
    return null;
  }

  return (
    <section className={styles.block} aria-labelledby="chu-so-huu">
      <h2 id="chu-so-huu" className={styles.title}>
        Chủ sở hữu
      </h2>
      <dl className={`${styles.list} ${styles.compact}`}>
        {rows.map((row) => (
          <div key={row.id} className={styles.row}>
            <dt className={styles.label}>{row.label}</dt>
            <dd className={styles.value}>{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
