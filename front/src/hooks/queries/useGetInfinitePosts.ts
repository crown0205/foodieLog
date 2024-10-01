import { ResponsePost, getPosts } from '@/api';
import { queryKeys } from '@/constants';
import { ResponseError } from '@/types/common';
import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';

function useGetInfinitePosts(
  queryOptions?: UseInfiniteQueryOptions<
    ResponsePost[], // NOTE : TQueryFnData는 API 함수의 반환 타입
    ResponseError, // NOTE : TError는 API 함수의 에러 타입
    InfiniteData<ResponsePost[], number>, // NOTE : TData는 무한 스크롤을 위한 데이터 타입
    ResponsePost[], // NOTE : TQueryData는 API 함수의 반환 타입
    QueryKey, // NOTE : TQueryKey는 쿼리 키 타입
    number // NOTE : TPageParam은 페이지 파라미터 타입
  >,
) {
  return useInfiniteQuery({
    queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
    queryFn: ({ pageParam }) => getPosts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPost ? allPages.length + 1 : undefined;
    },
    ...queryOptions,
  });
}

export default useGetInfinitePosts;
