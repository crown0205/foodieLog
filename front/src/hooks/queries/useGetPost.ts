import { UseQueryCustomOptions } from '@/types/common';
import { queryKeys } from '@/constants';
import { useQuery } from '@tanstack/react-query';
import { ResponseSinglePost, getPost } from '@/api';

function useGetPost(
  id: number | null,
  queryOptions?: UseQueryCustomOptions<ResponseSinglePost>,
) {
  return useQuery({
    queryKey: [queryKeys.POST, queryKeys.GET_POST, id],
    queryFn: () => getPost(Number(id)),
    enabled: Boolean(id),
    ...queryOptions,
  });
}

export default useGetPost;
