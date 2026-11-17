import axiosClient from './axiosClient';

export async function getDanhSachThongBao(params) {
  const response = await axiosClient.get('/thong-bao', { params });
  return response.data;
}

export async function getThongBaoMoiNhat(limit = 5) {
  const response = await axiosClient.get('/thong-bao/moi-nhat', { params: { limit } });
  return response.data;
}

export async function getThongBaoById(id) {
  const response = await axiosClient.get(`/thong-bao/${id}`);
  return response.data;
}

export async function createThongBao(payload) {
  const response = await axiosClient.post('/thong-bao', payload);
  return response.data;
}

export async function updateThongBao(id, payload) {
  const response = await axiosClient.put(`/thong-bao/${id}`, payload);
  return response.data;
}

export async function deleteThongBao(id) {
  const response = await axiosClient.delete(`/thong-bao/${id}`);
  return response.data;
}

export default {
  getDanhSachThongBao,
  getThongBaoMoiNhat,
  getThongBaoById,
  createThongBao,
  updateThongBao,
  deleteThongBao,
};
