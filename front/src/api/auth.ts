import { Category, Profile } from '../types/domain';
import { getEncryptStorage } from '../utils';
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
  const { data } = await axiosInstance.post('/auth/signup', {
    email,
    password,
  });

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
  const { data } = await axiosInstance.post('/auth/signin', {
    email,
    password,
  });

  return data;
};

const kakaoLogin = async (token: string): Promise<ResponseToken> => {
  const { data } = await axiosInstance.post('/auth/oauth/kakao', { token });

  return data;
};

type RequestAppleIdentity = {
  identityToken: string;
  appId: string;
  nickname: string | null;
};

const appleLogin = async (
  body: RequestAppleIdentity,
): Promise<ResponseToken> => {
  const { data } = await axiosInstance.post('/auth/oauth/apple', body);

  return data;
};

type ResponseProfile = Profile & Category;

// NOTE : 프로필 조회 API
const getProfile = async (): Promise<ResponseProfile> => {
  const { data } = await axiosInstance.get('/auth/me');

  return data;
};

type RequestProfile = Omit<
  Profile,
  'id' | 'email' | 'kakaoImageUrl' | 'loginType'
>;

const editProfile = async (body: RequestProfile): Promise<ResponseProfile> => {
  const { data } = await axiosInstance.patch('/auth/me', body);

  return data;
};

// NOTE : 엑세스 토큰 갱신 API
const getAccessToken = async (): Promise<ResponseToken> => {
  const refreshToken = await getEncryptStorage('refreshToken');

  const { data } = await axiosInstance.get('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return data;
};

const logout = async (): Promise<void> => {
  await axiosInstance.post('/auth/logout');
};

export {
  appleLogin,
  editProfile,
  getAccessToken,
  getProfile,
  kakaoLogin,
  logout,
  postLogin,
  postSignup,
};
export type {
  RequestAppleIdentity,
  RequestProfile,
  RequestUser,
  ResponseProfile,
  ResponseToken,
};
