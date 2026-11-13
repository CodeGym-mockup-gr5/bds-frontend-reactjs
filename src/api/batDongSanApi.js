import axiosClient from './axiosClient';

export async function searchBatDongSan(params) {
  const response = await axiosClient.get('/bat-dong-san', { params });
  return response.data;
}

export async function getBatDongSanMoiDang(params) {
  const response = await axiosClient.get('/bat-dong-san/moi-dang', { params });
  return response.data;
}

export default {
  searchBatDongSan,
  getBatDongSanMoiDang,
};
