import axiosClient from './axiosClient';

export async function getHeader() {
  const response = await axiosClient.get('/header');
  return response.data;
}

export default {
  getHeader,
};
