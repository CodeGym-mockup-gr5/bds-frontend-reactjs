import axiosClient from './axiosClient';

export async function getNhuCauCuaToi(params) {
  const response = await axiosClient.get('/khach-hang/me/nhu-cau', { params });
  return response.data;
}

export default {
  getNhuCauCuaToi,
};
