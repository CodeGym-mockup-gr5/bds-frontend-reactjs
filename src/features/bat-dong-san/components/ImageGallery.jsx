import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, ImageIcon } from '../../../components/Icons';
import resolveAssetUrl from '../../../utils/url';
import styles from './ImageGallery.module.css';

function NoImage() {
  return (
    <div className={styles.noImage}>
      <ImageIcon size={40} />
      <span>Chưa có ảnh</span>
    </div>
  );
}

function sortImages(hinhAnh) {
  return [...(hinhAnh || [])].sort((a, b) => a.thuTu - b.thuTu);
}

export default function ImageGallery({ hinhAnh, alt }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [brokenIds, setBrokenIds] = useState({});
  const images = sortImages(hinhAnh);

  if (!images.length) {
    return (
      <div className={styles.main}>
        <NoImage />
      </div>
    );
  }

  const index = Math.min(activeIndex, images.length - 1);
  const active = images[index];
  const hasMany = images.length > 1;
  const goTo = (next) => setActiveIndex((next + images.length) % images.length);
  const markBroken = (imageId) => setBrokenIds((prev) => ({ ...prev, [imageId]: true }));

  return (
    <div className={styles.gallery}>
      <div className={styles.main}>
        {brokenIds[active.id] ? (
          <NoImage />
        ) : (
          <img
            className={styles.mainImage}
            src={resolveAssetUrl(active.duongDan)}
            alt={`${alt} - ảnh ${index + 1}`}
            onError={() => markBroken(active.id)}
          />
        )}
        {hasMany && (
          <>
            <button
              type="button"
              className={`${styles.nav} ${styles.prev}`}
              onClick={() => goTo(index - 1)}
              aria-label="Ảnh trước"
            >
              <ChevronLeftIcon size={20} />
            </button>
            <button
              type="button"
              className={`${styles.nav} ${styles.next}`}
              onClick={() => goTo(index + 1)}
              aria-label="Ảnh sau"
            >
              <ChevronRightIcon size={20} />
            </button>
          </>
        )}
        <span className={styles.counter}>
          {index + 1} / {images.length}
        </span>
      </div>

      {hasMany && (
        <ul className={styles.thumbs}>
          {images.map((image, imageIndex) => (
            <li key={image.id}>
              <button
                type="button"
                className={`${styles.thumb} ${imageIndex === index ? styles.thumbActive : ''}`}
                onClick={() => setActiveIndex(imageIndex)}
                aria-label={`Xem ảnh ${imageIndex + 1}`}
                aria-current={imageIndex === index ? 'true' : undefined}
              >
                {brokenIds[image.id] ? (
                  <ImageIcon size={20} />
                ) : (
                  <img
                    src={resolveAssetUrl(image.duongDan)}
                    alt=""
                    loading="lazy"
                    onError={() => markBroken(image.id)}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
