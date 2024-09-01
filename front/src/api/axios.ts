import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3030',
  withCredentials: true, // NOTE : 쿠키를 주고받기 위해 필요
});

export default axiosInstance;
