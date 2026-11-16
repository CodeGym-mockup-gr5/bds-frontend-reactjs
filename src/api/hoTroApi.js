import axiosClient from './axiosClient';

export async function getDanhSachHuongDan() {
  const response = await axiosClient.get('/ho-tro');
  return response.data;
}

export async function getChiTietHuongDan(maHuongDan) {
  const response = await axiosClient.get(`/ho-tro/${maHuongDan}`);
  return response.data;
}

export default {
  getDanhSachHuongDan,
  getChiTietHuongDan,
};
