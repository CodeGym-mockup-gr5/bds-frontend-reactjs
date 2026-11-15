import axiosClient from './axiosClient';

export async function getDanhSachNhanVien(params) {
  const response = await axiosClient.get('/nhan-vien', { params });
  return response.data;
}

export default {
  getDanhSachNhanVien,
};
