import { updateFavoritePost } from '@/api';
import queryClient from '@/api/queryClient';
import { queryKeys } from '@/constants';
import { UseMutationCustomOptions } from '@/types/common';
import { useMutation } from '@tanstack/react-query';

function useMutateFavoritePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: updateFavoritePost,
    onSuccess: updateId => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POST, updateId],
      });

      // const existingPost = queryClient.getQueryData<ResponseSinglePost>([
      //   queryKeys.POST,
      //   queryKeys.GET_POST,
      //   updateId,
      // ]) as ResponseSinglePost;

      // queryClient.setQueryData([queryKeys.POST, queryKeys.GET_POST, updateId], {
      //   ...existingPost,
      //   isFavorite: !existingPost.isFavorite,
      // });
    },
    ...mutationOptions,
  });
}

export default useMutateFavoritePost;
