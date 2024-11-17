import { ResponseCalendarPost, getCalendarPosts } from '@/api';
import { queryKeys } from '@/constants';
import { UseQueryCustomOptions } from '@/types/common';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

function useGetCalendarPosts(
  year: number,
  month: number,
  queryOptions?: UseQueryCustomOptions<ResponseCalendarPost>,
) {
  return useQuery({
    queryFn: () => getCalendarPosts(year, month),
    queryKey: [queryKeys.POST, queryKeys.GET_CALENDAR_POSTS, year, month],
    placeholderData: keepPreviousData, // NOTE : 이전 데이터를 유지하면서 새로운 데이터를 가져옴
    ...queryOptions,
  });
}

export default useGetCalendarPosts;
