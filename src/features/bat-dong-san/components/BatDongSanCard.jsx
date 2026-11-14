import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRightIcon, ImageIcon, PinIcon } from '../../../components/Icons';
import StatusBadge from '../../../components/StatusBadge';
import { formatArea, formatCurrency, formatDate, formatPricePerM2 } from '../../../utils/format';
import resolveAssetUrl from '../../../utils/url';
import { HUONG_OPTIONS, LOAI_BDS_OPTIONS, getOptionLabel } from '../constants/batDongSanOptions';
import styles from './BatDongSanCard.module.css';

function CardImage({ src, alt }) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className={styles.noImage}>
        <ImageIcon size={32} />
        <span>Chưa có ảnh</span>
      </div>
    );
  }

  return (
    <img
      className={styles.image}
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
}

export default function BatDongSanCard({ batDongSan }) {
  const { id, maBds, diaChi, ngayDang, maKh, tenChuSoHuu } = batDongSan;
  const loaiLabel = getOptionLabel(LOAI_BDS_OPTIONS, batDongSan.loaiBds);
  const huongLabel = getOptionLabel(HUONG_OPTIONS, batDongSan.huong);
  const meta = [maBds, loaiLabel, huongLabel && `Hướng ${huongLabel}`].filter(Boolean);
  const specs = [formatPricePerM2(batDongSan.giaM2), formatArea(batDongSan.dienTich)];
  const chuSoHuu = [maKh, tenChuSoHuu].filter(Boolean).join(' · ');
  const ngayDangText = formatDate(ngayDang);

  return (
    <Link to={`/bat-dong-san/${id}`} className={styles.card}>
      <div className={styles.media}>
        <CardImage src={resolveAssetUrl(batDongSan.anhDaiDien)} alt={`${loaiLabel} ${diaChi}`} />
        <StatusBadge tinhTrang={batDongSan.tinhTrang} className={styles.badge} />
        {ngayDangText && <span className={styles.date}>Đăng {ngayDangText}</span>}
      </div>

      <div className={styles.body}>
        <p className={styles.meta}>{meta.join(' · ')}</p>

        <div>
          <p className={styles.price}>{formatCurrency(batDongSan.gia)}</p>
          <p className={styles.specs}>{specs.filter(Boolean).join(' · ')}</p>
        </div>

        <p className={styles.address} title={diaChi}>
          <PinIcon size={16} className={styles.pin} />
          <span className={styles.addressText}>{diaChi}</span>
        </p>

        {chuSoHuu && <p className={styles.owner}>Chủ sở hữu: {chuSoHuu}</p>}

        <span className={styles.more}>
          Xem chi tiết
          <ArrowUpRightIcon size={16} />
        </span>
      </div>
    </Link>
  );
}
