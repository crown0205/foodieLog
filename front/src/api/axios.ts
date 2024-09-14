import {deviceType} from '@/utils';
import axios from 'axios';

const axiosInstance = axios.create({
  // NOTE : 안드로이드에서는 localhost가 잘 동작하지 않으므로, 10.0.2.2를 사용
  baseURL:
    deviceType === 'android' ? 'http://10.0.2.2:3030' : 'http://localhost:3030',
  withCredentials: true, // NOTE : 쿠키를 주고받기 위해 필요
});

export default axiosInstance;
