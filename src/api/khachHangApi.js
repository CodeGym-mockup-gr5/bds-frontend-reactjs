import axiosClient from './axiosClient';

export async function getProfileKhachHang() {
  const response = await axiosClient.get('/khach-hang/profile');
  return response.data;
}

export async function updateProfileKhachHang(payload) {
  const response = await axiosClient.put('/khach-hang/profile', payload);
  return response.data;
}

export async function yeuCauDangTinBan() {
  const response = await axiosClient.post('/khach-hang/me/yeu-cau-dang-tin');
  return response.data;
}

export default {
  getProfileKhachHang,
  updateProfileKhachHang,
  yeuCauDangTinBan,
};
