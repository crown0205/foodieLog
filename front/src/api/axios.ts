import { deviceType } from '@/utils';
import axios from 'axios';

export const BASE_URL: string =
  deviceType === 'ios' ? 'http://localhost:3030/' : 'http://10.0.2.2:3030/';

const axiosInstance = axios.create({
  // NOTE : 안드로이드에서는 localhost가 잘 동작하지 않으므로, 10.0.2.2를 사용
  baseURL: BASE_URL,
  withCredentials: true, // NOTE : 쿠키를 주고받기 위해 필요
});

export default axiosInstance;
