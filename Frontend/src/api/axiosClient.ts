import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:5074/api',//` Thay đổi URL này thành URL của API của bạn
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tự động xử lý trước khi gửi request (ví dụ: thêm Token)
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;