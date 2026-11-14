import axiosClient from './axiosClient';

export async function login(payload) {
  const response = await axiosClient.post('/auth/login', payload);
  return response.data;
}

export async function register(payload) {
  const response = await axiosClient.post('/auth/register', payload);
  return response.data;
}

export async function getMe() {
  const response = await axiosClient.get('/auth/me');
  return response.data;
}

export async function logout() {
  const response = await axiosClient.post('/auth/logout');
  return response.data;
}

export async function changePassword(payload) {
  const response = await axiosClient.post('/auth/change-password', payload);
  return response.data;
}

export async function forgotPassword(payload) {
  const response = await axiosClient.post('/auth/forgot-password', payload);
  return response.data;
}

export async function setPassword(payload) {
  const response = await axiosClient.post('/auth/set-password', payload);
  return response.data;
}

export default {
  login,
  register,
  getMe,
  logout,
  changePassword,
  forgotPassword,
  setPassword,
};
