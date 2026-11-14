import axiosClient from './axiosClient';

export async function getProfileNhanVien() {
  const response = await axiosClient.get('/nhan-vien/profile');
  return response.data;
}

export async function updateProfileNhanVien(payload) {
  const response = await axiosClient.put('/nhan-vien/profile', payload);
  return response.data;
}

export default {
  getProfileNhanVien,
  updateProfileNhanVien,
};
