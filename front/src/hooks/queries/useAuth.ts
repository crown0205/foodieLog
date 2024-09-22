import {
  ResponseProfile,
  getAccessToken,
  getProfile,
  logout,
  postLogin,
  postSignup,
} from '@/api/auth';
import queryClient from '@/api/queryClient';
import { queryKeys, storageKeys } from '@/constants';
import {
  UseMutationCustomOptions,
  UseQueryCustomOptions,
} from '@/types/common';
import {
  removeEncryptStorage,
  removerHeader,
  setEncryptStorage,
  setHeader,
} from '@/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
}

function useLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postLogin,
    onSuccess: ({ accessToken, refreshToken }) => {
      setHeader('Authorization', `Bearer ${accessToken}`);
      setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken);
    },
    onSettled: () => {
      // NOTE : invalidateQueries를 사용하여 캐시된 데이터를 제거합니다.
      queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
      });
      // NOTE : refetchQueries를 사용하여 캐시된 데이터를 다시 불러옵니다.
      queryClient.refetchQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      });
    },
    ...mutationOptions,
  });
}

function useGetRefreshToken() {
  const { data, isSuccess, isError } = useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
    queryFn: getAccessToken,
    staleTime: 1000 * 60 * 30 - 1000 * 60 * 3, // NOTE : staleTime의 역할은 캐시된 데이터를 얼마나 오래 사용할 것인지를 결정하는 옵션입니다. 이 값을 설정하면 캐시된 데이터를 사용하고, 이 시간이 지나면 새로운 데이터를 가져옵니다.
    refetchInterval: 1000 * 60 * 30, // NOTE : refetchInterval의 역할은 캐시된 데이터를 얼마나 자주 갱신할 것인지를 결정하는 옵션입니다. 이 값을 설정하면 캐시된 데이터를 사용하고, 이 시간이 지나면 새로운 데이터를 가져옵니다.
    refetchOnReconnect: true, // NOTE : refetchOnReconnect의 역할은 인터넷 연결이 다시 연결될 때마다 refetchInterval을 실행할 것인지를 결정하는 옵션입니다.
    refetchIntervalInBackground: true, // NOTE : refetchIntervalInBackground의 역할은 앱이 백그라운드로 내려갔을 때도 refetchInterval을 계속 실행할 것인지를 결정하는 옵션입니다.
  });

  useEffect(() => {
    if (isSuccess) {
      setHeader('Authorization', `Bearer ${data?.accessToken}`);
      setEncryptStorage(storageKeys.REFRESH_TOKEN, data?.refreshToken);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      removerHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
    }
  }, [isError]);

  return { isSuccess, isError };
}

function useGetProfile(queryOptions?: UseQueryCustomOptions<ResponseProfile>) {
  return useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    queryFn: getProfile,
    ...queryOptions,
  });
}

function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removerHeader('Authorization');
      removeEncryptStorage(storageKeys.REFRESH_TOKEN);
      queryClient.resetQueries({ queryKey: [queryKeys.AUTH] });
    },
    ...mutationOptions,
  });
}

function useAuth() {
  const signupMutation = useSignup();
  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    enabled: refreshTokenQuery.isSuccess,
  });

  const isLogin = getProfileQuery.isSuccess;
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  return {
    signupMutation,
    refreshTokenQuery,
    getProfileQuery,
    isLogin,
    loginMutation,
    logoutMutation,
  };
}

export default useAuth;
