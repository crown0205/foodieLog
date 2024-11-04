import { ResponsePost, getSearchPosts } from '@/api';
import { queryKeys } from '@/constants';
import { ResponseError } from '@/types/common';
import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';

function useGetInfiniteSearchPosts(
  query: string,
  queryOptions?: UseInfiniteQueryOptions<
    ResponsePost[],
    ResponseError,
    InfiniteData<ResponsePost[], number>,
    ResponsePost[],
    QueryKey,
    number
  >,
) {
  return useSuspenseInfiniteQuery({
    queryKey: [queryKeys.POST, queryKeys.GET_SEARCH_POSTS, query],
    queryFn: ({ pageParam }) => getSearchPosts(pageParam, query),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPost ? allPages.length + 1 : undefined;
    },
    ...queryOptions,
  });
}

export default useGetInfiniteSearchPosts;
