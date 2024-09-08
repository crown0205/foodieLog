import {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';
import {AxiosError} from 'axios';

type ResponseError = AxiosError<{
  statusCode: number;
  message: string;
  error: string;
}>;

type UseMutationCustomOptions<TDate = unknown, TVariables = unknown> = Omit<
  UseMutationOptions<TDate, ResponseError, TVariables, unknown>,
  'mutationFn'
>;

type UseQueryCustomOptions<TQueryFnData = unknown, TDate = TQueryFnData> = Omit<
  UseQueryOptions<TQueryFnData, ResponseError, TDate, QueryKey>,
  'queryKey'
>;

export type {ResponseError, UseMutationCustomOptions, UseQueryCustomOptions};
