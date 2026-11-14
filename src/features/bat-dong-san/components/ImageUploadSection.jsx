import { useId, useRef, useState } from 'react';
import useWindowFileDropGuard, { isFileDrag } from '../hooks/useWindowFileDropGuard';
import { UploadIcon, WarningIcon } from './DangTinIcons';
import ImageThumb from './ImageThumb';
import styles from './ImageUpload.module.css';

export default function ImageUploadSection({
  images,
  rejectedFiles,
  addFiles,
  removeImage,
  retryImage,
  moveImage,
  moveImageTo,
  error = '',
  disabled = false,
}) {
  const inputId = useId();
  const errorId = `${inputId}-error`;
  const [isDragOver, setIsDragOver] = useState(false);
  const [draggingId, setDraggingId] = useState(null);
  const dragDepthRef = useRef(0);
  useWindowFileDropGuard();

  const handleDragEnter = (event) => {
    if (disabled || !isFileDrag(event)) return;
    dragDepthRef.current += 1;
    setIsDragOver(true);
  };

  const handleDragLeave = (event) => {
    if (!isFileDrag(event) || dragDepthRef.current === 0) return;
    dragDepthRef.current -= 1;
    if (dragDepthRef.current === 0) setIsDragOver(false);
  };

  const handleDragOver = (event) => {
    if (disabled || !isFileDrag(event)) return;
    event.preventDefault();
  };

  const handleDrop = (event) => {
    if (!isFileDrag(event)) return;
    event.preventDefault();
    dragDepthRef.current = 0;
    setIsDragOver(false);
    if (disabled) return;
    addFiles(event.dataTransfer.files);
  };

  const handleInputChange = (event) => {
    const input = event.currentTarget;
    addFiles(input.files);
    input.value = '';
  };

  const handleDropOnThumb = (toIndex, sourceId) => {
    if (disabled) return;
    const movingId = sourceId || draggingId;
    if (movingId) moveImageTo(movingId, toIndex);
    setDraggingId(null);
  };

  const dropzoneClassName = [
    styles.dropzone,
    isDragOver ? styles.dropzoneActive : '',
    error ? styles.dropzoneError : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={styles.wrapper}
      data-invalid={error ? 'true' : undefined}
      tabIndex={error ? -1 : undefined}
      aria-describedby={error ? errorId : undefined}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className={dropzoneClassName}>
        <UploadIcon className={styles.uploadIcon} />
        <p className={styles.dropText}>Kéo thả ảnh vào đây hoặc</p>
        <label htmlFor={inputId} className={styles.pickButton}>
          Chọn ảnh
          <input
            id={inputId}
            type="file"
            accept=".jpg,.jpeg,.png,image/jpeg,image/png"
            multiple
            className={styles.visuallyHidden}
            onChange={handleInputChange}
          />
        </label>
        <p className={styles.rules}>
          JPG, PNG · Tối đa 10 ảnh · Mỗi ảnh tối đa 5MB · Ảnh đầu tiên là ảnh bìa, kéo để đổi thứ tự
        </p>
      </div>

      {rejectedFiles.length > 0 && (
        <ul className={styles.rejectedList} role="alert">
          {rejectedFiles.map((file) => (
            <li key={file.id} className={styles.rejectedItem}>
              <WarningIcon className={styles.errorIcon} />
              <span>{`${file.name}: ${file.error}`}</span>
            </li>
          ))}
        </ul>
      )}

      {images.length > 0 && (
        <ul className={styles.grid} aria-label="Ảnh đã chọn">
          {images.map((image, index) => (
            <ImageThumb
              key={image.id}
              image={image}
              index={index}
              total={images.length}
              isDragging={draggingId === image.id}
              onDragStart={setDraggingId}
              onDragEnd={() => setDraggingId(null)}
              onDropOnThumb={handleDropOnThumb}
              onMove={moveImage}
              onRemove={removeImage}
              onRetry={retryImage}
              disabled={disabled}
            />
          ))}
        </ul>
      )}

      {error && (
        <p id={errorId} className={styles.sectionError} role="alert">
          <WarningIcon className={styles.errorIcon} />
          {error}
        </p>
      )}
    </div>
  );
}
