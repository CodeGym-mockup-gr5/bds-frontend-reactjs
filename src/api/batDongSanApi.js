import axiosClient from './axiosClient';

export async function createBatDongSan(payload) {
  const response = await axiosClient.post('/bat-dong-san', payload);
  return response.data;
}

export async function uploadHinhAnhBatDongSan(file, { onProgress = null, signal } = {}) {
  const formData = new FormData();
  formData.append('files', file);
  const response = await axiosClient.post('/bat-dong-san/hinh-anh', formData, {
    signal,
    onUploadProgress: (event) => {
      if (onProgress && event.total) {
        onProgress(Math.round((event.loaded * 100) / event.total));
      }
    },
  });
  return response.data;
}

export default {
  createBatDongSan,
  uploadHinhAnhBatDongSan,
};
