import {Profile, Category} from '../types/domain';
import {getEncryptStorage} from '../utils';
import axiosInstance from './axios';

type RequestUser = {
  email: string;
  password: string;
};

// 공통 response 타입
type CommonResponse = {
  message: string;
};

type ErrorCommonResponse = {
  error: string;
  statusCode: number;
  message: string;
};

// NOTE : 회원가입 API
const postSignup = async ({
  email,
  password,
}: RequestUser): Promise<CommonResponse | ErrorCommonResponse> => {
  const {data} = await axiosInstance.post('/auth/signup', {email, password});

  return data;
};

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

// NOTE : 로그인 API
const postLogin = async ({
  email,
  password,
}: RequestUser): Promise<ResponseToken> => {
  const {data} = await axiosInstance.post('/auth/signin', {email, password});

  return data;
};

type ResponseProfile = Profile & Category;

// NOTE : 프로필 조회 API
const getProfile = async (): Promise<ResponseProfile> => {
  const {data} = await axiosInstance.get('/auth/me');

  return data;
};

// NOTE : 엑세스 토큰 갱신 API
const getAccessToken = async (): Promise<ResponseToken> => {
  const refreshToken = await getEncryptStorage('refreshToken');

  const {data} = await axiosInstance.get('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return data;
};

const logout = async (): Promise<CommonResponse> => {
  const {data} = await axiosInstance.post('/auth/logout');

  return data;
};

export {postSignup, postLogin, getProfile, getAccessToken, logout};
export type {RequestUser, ResponseToken, ResponseProfile};
