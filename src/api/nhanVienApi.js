import axiosClient from './axiosClient';

export async function getDanhSachNhanVien(params) {
  const response = await axiosClient.get('/nhan-vien', { params });
  return response.data;
}

export async function deleteNhanVien(id) {
  const response = await axiosClient.delete(`/nhan-vien/${id}`);
  return response.data;
}

export async function updateNhanVien(id, data) {
  const response = await axiosClient.put(`/nhan-vien/${id}`, data);
  return response.data;
}

export default {
  getDanhSachNhanVien,
  deleteNhanVien,
  updateNhanVien,
};
