import {
  ResponseProfile,
  ResponseToken,
  appleLogin,
  deleteAccount,
  editCategory,
  editProfile,
  getAccessToken,
  getProfile,
  kakaoLogin,
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
import { Category, Profile } from '@/types/domain';
import {
  removeEncryptStorage,
  removerHeader,
  setEncryptStorage,
  setHeader,
} from '@/utils';
import { MutationFunction, useMutation, useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    throwOnError: error => Number(error.response?.status) >= 500,
    ...mutationOptions,
  });
}

function useLogin<T>(
  loginAPI: MutationFunction<ResponseToken, T>,
  mutationOptions?: UseMutationCustomOptions,
) {
  return useMutation({
    mutationFn: loginAPI,
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
    throwOnError: error => Number(error.response?.status) >= 500,
    ...mutationOptions,
  });
}

function useEmailLogin(mutationOption?: UseMutationCustomOptions) {
  return useLogin(postLogin, mutationOption);
}

function useKakaoLogin(mutationOption?: UseMutationCustomOptions) {
  return useLogin(kakaoLogin, mutationOption);
}

function useAppleLogin(mutationOption?: UseMutationCustomOptions) {
  return useLogin(appleLogin, mutationOption);
}

function useGetRefreshToken() {
  const { data, isSuccess, isError, isPending } = useQuery({
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

  return { isSuccess, isError, isPending };
}

type ResponseSelectProfile = { categories: Category } & Profile;

const transformProfileCategory = (
  data: ResponseProfile,
): ResponseSelectProfile => {
  const { RED, YELLOW, GREEN, BLUE, PURPLE, ...rest } = data;
  const categories = { RED, YELLOW, GREEN, BLUE, PURPLE };

  return { categories, ...rest };
};

function useGetProfile(
  queryOptions?: UseQueryCustomOptions<ResponseProfile, ResponseSelectProfile>,
) {
  return useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    queryFn: getProfile,
    select: transformProfileCategory,
    ...queryOptions,
  });
}

function useUpdateProfile(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: editProfile,
    onSuccess: newProfile => {
      queryClient.setQueryData(
        [queryKeys.AUTH, queryKeys.GET_PROFILE],
        newProfile,
      );
    },
    ...mutationOptions,
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

function useMutateDeleteAccount(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({ mutationFn: deleteAccount, ...mutationOptions });
}

function useMutateCategory(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: editCategory,
    onSuccess: newProfile => {
      queryClient.setQueryData(
        [queryKeys.AUTH, queryKeys.GET_PROFILE],
        newProfile,
      );
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
  const loginMutation = useEmailLogin();
  const kakaoLoginMutation = useKakaoLogin();
  const appleLoginMutation = useAppleLogin();
  const logoutMutation = useLogout();
  const profileMutation = useUpdateProfile();
  const deleteAccountMutation = useMutateDeleteAccount({
    onSuccess: () => logoutMutation.mutate(null),
  });
  const categoryMutation = useMutateCategory();
  const isLoginLoading = refreshTokenQuery.isPending;

  return {
    signupMutation,
    refreshTokenQuery,
    getProfileQuery,
    isLogin,
    loginMutation,
    logoutMutation,
    kakaoLoginMutation,
    appleLoginMutation,
    profileMutation,
    deleteAccountMutation,
    categoryMutation,
    isLoginLoading,
  };
}

export default useAuth;
