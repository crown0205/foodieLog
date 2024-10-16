import { ResponsePost, getFavoritePosts } from '@/api';
import { queryKeys } from '@/constants';
import { ResponseError } from '@/types/common';
import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';

function useGetInfiniteFavoritePost(
  queryOptions?: UseInfiniteQueryOptions<
    ResponsePost[],
    ResponseError,
    InfiniteData<ResponsePost[], number>,
    ResponsePost[],
    QueryKey,
    number
  >,
) {
  return useInfiniteQuery({
    queryKey: [
      queryKeys.POST,
      queryKeys.FAVORITE,
      queryKeys.GET_FAVORITE_POSTS,
    ],
    queryFn: ({ pageParam }) => getFavoritePosts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const lastPost = lastPage[lastPage.length - 1];
      return lastPost ? allPages.length + 1 : undefined;
    },
    ...queryOptions,
  });
}

export default useGetInfiniteFavoritePost;
