import { useCallback, useEffect, useRef, useState } from 'react';
import { uploadHinhAnhBatDongSan } from '../../../api/batDongSanApi';
import {
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGE_COUNT,
  MAX_IMAGE_SIZE_BYTES,
} from '../constants/batDongSanOptions';

const UPLOAD_MESSAGES = {
  type: 'Chỉ chấp nhận định dạng ảnh JPG, PNG',
  size: 'Kích thước mỗi ảnh không được vượt quá 5MB',
  count: 'Chỉ được tải lên tối đa 10 hình ảnh',
  failed: 'Tải ảnh lên thất bại. Vui lòng thử lại.',
};

function getFileError(file, currentCount) {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) return UPLOAD_MESSAGES.type;
  if (file.size > MAX_IMAGE_SIZE_BYTES) return UPLOAD_MESSAGES.size;
  return currentCount >= MAX_IMAGE_COUNT ? UPLOAD_MESSAGES.count : '';
}

function moveItem(list, fromIndex, toIndex) {
  if (fromIndex < 0 || toIndex < 0 || toIndex >= list.length || fromIndex === toIndex) {
    return list;
  }
  const next = [...list];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  return next;
}

export default function useImageUpload() {
  const [images, setImages] = useState([]);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const idCounterRef = useRef(0);
  const controllersRef = useRef(new Map());
  const previewUrlsRef = useRef(new Set());

  useEffect(() => {
    const controllers = controllersRef.current;
    const previewUrls = previewUrlsRef.current;
    return () => {
      controllers.forEach((controller) => controller.abort());
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const nextId = useCallback((prefix) => {
    idCounterRef.current += 1;
    return `${prefix}-${idCounterRef.current}`;
  }, []);

  const updateImage = useCallback((id, changes) => {
    setImages((prev) => prev.map((image) => (image.id === id ? { ...image, ...changes } : image)));
  }, []);

  const startUpload = useCallback(
    async (id, file) => {
      const controller = new AbortController();
      controllersRef.current.set(id, controller);
      updateImage(id, { status: 'uploading', progress: 0, error: '' });
      try {
        const response = await uploadHinhAnhBatDongSan(file, {
          signal: controller.signal,
          onProgress: (progress) => updateImage(id, { progress }),
        });
        const url = Array.isArray(response?.data) ? response.data[0] : '';
        if (url) {
          updateImage(id, { status: 'done', progress: 100, url });
        } else {
          updateImage(id, { status: 'error', error: UPLOAD_MESSAGES.failed });
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          const message = error?.response?.data?.message || UPLOAD_MESSAGES.failed;
          updateImage(id, { status: 'error', error: message });
        }
      } finally {
        controllersRef.current.delete(id);
      }
    },
    [updateImage],
  );

  const addFiles = useCallback(
    (fileList) => {
      const accepted = [];
      const rejected = [];
      Array.from(fileList || []).forEach((file) => {
        const error = getFileError(file, images.length + accepted.length);
        if (error) {
          rejected.push({ id: nextId('rejected'), name: file.name, error });
          return;
        }
        const previewUrl = URL.createObjectURL(file);
        previewUrlsRef.current.add(previewUrl);
        accepted.push({ id: nextId('image'), file, previewUrl, status: 'uploading', progress: 0 });
      });
      setRejectedFiles(rejected);
      if (accepted.length > 0) {
        setImages((prev) => [...prev, ...accepted]);
        accepted.forEach((image) => startUpload(image.id, image.file));
      }
    },
    [images.length, nextId, startUpload],
  );

  const removeImage = useCallback(
    (id) => {
      controllersRef.current.get(id)?.abort();
      const target = images.find((image) => image.id === id);
      if (target) {
        URL.revokeObjectURL(target.previewUrl);
        previewUrlsRef.current.delete(target.previewUrl);
      }
      setImages((prev) => prev.filter((image) => image.id !== id));
    },
    [images],
  );

  const retryImage = useCallback(
    (id) => {
      const target = images.find((image) => image.id === id);
      if (target) startUpload(id, target.file);
    },
    [images, startUpload],
  );

  const moveImage = useCallback((id, offset) => {
    setImages((prev) => {
      const fromIndex = prev.findIndex((image) => image.id === id);
      return moveItem(prev, fromIndex, fromIndex + offset);
    });
  }, []);

  const moveImageTo = useCallback((id, toIndex) => {
    setImages((prev) =>
      moveItem(
        prev,
        prev.findIndex((image) => image.id === id),
        toIndex,
      ),
    );
  }, []);

  return {
    images,
    rejectedFiles,
    addFiles,
    removeImage,
    retryImage,
    moveImage,
    moveImageTo,
  };
}
