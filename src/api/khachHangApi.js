import axiosClient from './axiosClient';

export async function yeuCauDangTinBan() {
  const response = await axiosClient.post('/khach-hang/me/yeu-cau-dang-tin');
  return response.data;
}

export default {
  yeuCauDangTinBan,
};
