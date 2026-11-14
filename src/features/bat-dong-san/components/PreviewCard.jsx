import { useId } from 'react';
import { formatArea, formatCurrency, formatPricePerM2 } from '../../../utils/format';
import { HUONG_OPTIONS, LOAI_BDS_OPTIONS, getOptionLabel } from '../constants/batDongSanOptions';
import { computePricePerM2, parseArea, parsePrice } from '../utils/dangTinValidation';
import { ImageIcon } from './DangTinIcons';
import styles from './DangTinSidebar.module.css';

export default function PreviewCard({ values, images }) {
  const titleId = useId();
  const cover = images[0];
  const price = parsePrice(values.gia);
  const area = parseArea(values.dienTich);
  const pricePerM2 = computePricePerM2(values);
  const meta = [
    getOptionLabel(LOAI_BDS_OPTIONS, values.loaiBds),
    getOptionLabel(HUONG_OPTIONS, values.huong),
  ]
    .filter(Boolean)
    .join(' · ');
  const details = [
    pricePerM2 === null ? '' : formatPricePerM2(pricePerM2),
    area === null ? '' : formatArea(area),
  ]
    .filter(Boolean)
    .join(' · ');
  const address = values.diaChi.trim();

  return (
    <section className={styles.card} aria-labelledby={titleId}>
      <h2 id={titleId} className={styles.cardTitle}>
        Xem trước tin
      </h2>
      <div className={styles.previewMedia}>
        {cover ? (
          <img src={cover.previewUrl} alt="Ảnh bìa tin đăng" className={styles.previewImage} />
        ) : (
          <div className={styles.previewPlaceholder}>
            <ImageIcon className={styles.placeholderIcon} />
            <span>Chưa có ảnh bìa</span>
          </div>
        )}
        <span className={styles.badgeAvailable}>
          <span className={styles.badgeDot} aria-hidden="true" />
          Có sẵn
        </span>
      </div>
      {meta && <p className={styles.previewMeta}>{meta}</p>}
      <p className={price === null ? styles.previewEmpty : styles.previewPrice}>
        {price === null ? 'Chưa nhập giá' : formatCurrency(price)}
      </p>
      <p className={details ? styles.previewDetails : styles.previewEmpty}>
        {details || 'Chưa nhập diện tích'}
      </p>
      <p className={address ? styles.previewAddress : styles.previewEmpty} title={address}>
        {address || 'Chưa nhập địa chỉ'}
      </p>
    </section>
  );
}
