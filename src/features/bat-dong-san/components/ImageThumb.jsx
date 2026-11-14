import {
  ChevronLeftIcon,
  ChevronRightIcon,
  RetryIcon,
  TrashIcon,
  WarningIcon,
} from './DangTinIcons';
import { isFileDrag } from '../hooks/useWindowFileDropGuard';
import styles from './ImageThumb.module.css';

export default function ImageThumb({
  image,
  index,
  total,
  isDragging,
  onDragStart,
  onDragEnd,
  onDropOnThumb,
  onMove,
  onRemove,
  onRetry,
  disabled = false,
}) {
  const position = index + 1;
  const isCover = index === 0;
  const thumbClassName = [
    styles.thumb,
    isDragging ? styles.thumbDragging : '',
    image.status === 'error' ? styles.thumbFailed : '',
  ]
    .filter(Boolean)
    .join(' ');

  const handleDragStart = (event) => {
    const { dataTransfer } = event;
    dataTransfer.effectAllowed = 'move';
    dataTransfer.setData('text/plain', image.id);
    onDragStart(image.id);
  };

  const handleDragOver = (event) => {
    if (!isFileDrag(event)) event.preventDefault();
  };

  const handleDrop = (event) => {
    if (isFileDrag(event)) return;
    event.preventDefault();
    if (disabled) return;
    onDropOnThumb(index, event.dataTransfer.getData('text/plain'));
  };

  return (
    <li
      className={thumbClassName}
      draggable={!disabled}
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className={styles.media}>
        <img
          src={image.previewUrl}
          alt={isCover ? `Ảnh ${position} (ảnh bìa)` : `Ảnh ${position}`}
          className={styles.image}
          draggable={false}
        />
        {isCover && <span className={styles.coverBadge}>Ảnh bìa</span>}
        {image.status === 'uploading' && (
          <div
            className={styles.progressTrack}
            role="progressbar"
            aria-label={`Tiến độ tải ảnh ${position}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={image.progress}
          >
            <div className={styles.progressBar} style={{ width: `${image.progress}%` }} />
          </div>
        )}
      </div>

      {image.status === 'uploading' && (
        <p className={styles.status}>{`Đang tải ${image.progress}%`}</p>
      )}
      {image.status === 'error' && (
        <p className={styles.statusError} role="alert">
          <WarningIcon className={styles.errorIcon} />
          {image.error}
        </p>
      )}

      <div className={styles.thumbActions}>
        <button
          type="button"
          className={styles.iconButton}
          onClick={() => onMove(image.id, -1)}
          disabled={index === 0}
          aria-label={`Chuyển ảnh ${position} sang trái`}
          title="Chuyển trái"
        >
          <ChevronLeftIcon className={styles.actionIcon} />
        </button>
        <button
          type="button"
          className={styles.iconButton}
          onClick={() => onMove(image.id, 1)}
          disabled={index === total - 1}
          aria-label={`Chuyển ảnh ${position} sang phải`}
          title="Chuyển phải"
        >
          <ChevronRightIcon className={styles.actionIcon} />
        </button>
        {image.status === 'error' && (
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => onRetry(image.id)}
            aria-label={`Thử lại ảnh ${position}`}
            title="Thử lại"
          >
            <RetryIcon className={styles.actionIcon} />
          </button>
        )}
        <button
          type="button"
          className={`${styles.iconButton} ${styles.iconButtonDanger}`}
          onClick={() => onRemove(image.id)}
          aria-label={`Xóa ảnh ${position}`}
          title="Xóa ảnh"
        >
          <TrashIcon className={styles.actionIcon} />
        </button>
      </div>
    </li>
  );
}
