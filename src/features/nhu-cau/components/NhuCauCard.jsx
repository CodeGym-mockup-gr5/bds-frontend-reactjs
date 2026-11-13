import {
  formatDienTichRange,
  formatGhiChu,
  formatLoaiBds,
  formatViTri,
} from '../utils/nhuCauFormat';
import { EMPTY_TEXT } from '../constants/nhuCauOptions';
import styles from './NhuCauCard.module.css';

export default function NhuCauCard({ nhuCau }) {
  const ghiChu = formatGhiChu(nhuCau.ghiChu);
  const hasGhiChu = ghiChu !== EMPTY_TEXT;
  const rows = [
    { key: 'loaiBds', label: 'Loại bất động sản', value: formatLoaiBds(nhuCau.loaiBds) },
    { key: 'viTri', label: 'Vị trí', value: formatViTri(nhuCau.viTri) },
    {
      key: 'dienTich',
      label: 'Diện tích',
      value: formatDienTichRange(nhuCau.dienTichMin, nhuCau.dienTichMax),
    },
  ];

  return (
    <article className={styles.card} aria-label={`Nhu cầu ${nhuCau.maNc || ''}`.trim()}>
      <h2 className={styles.code}>{nhuCau.maNc || 'Chưa có mã'}</h2>
      <dl className={styles.details}>
        {rows.map((row) => (
          <div key={row.key} className={styles.detail}>
            <dt className={styles.term}>{row.label}</dt>
            <dd className={styles.value}>{row.value}</dd>
          </div>
        ))}
        <div className={`${styles.detail} ${styles.detailWide}`}>
          <dt className={styles.term}>Ghi chú</dt>
          <dd className={hasGhiChu ? styles.value : `${styles.value} ${styles.valueMuted}`}>
            {ghiChu}
          </dd>
        </div>
      </dl>
    </article>
  );
}
