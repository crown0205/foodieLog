import { deletePost } from '@/api';
import queryClient from '@/api/queryClient';
import { queryKeys } from '@/constants';
import { useMutation } from '@tanstack/react-query';

function useMutateDeletePost() {
  return useMutation({
    mutationFn: deletePost,
    onSuccess: deleteId => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.MARKER, queryKeys.GET_MARKERS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_SEARCH_POSTS],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_CALENDAR_POSTS],
      });

      // queryClient.setQueryData<Marker[]>(
      //   [queryKeys.MARKER, queryKeys.GET_MARKERS],
      //   existingMarkers => {
      //     if(!existingMarkers) return
      //     return existingMarkers.filter(marker => marker.id !== deleteId);
      //   },
      // );
    },
  });
}

export default useMutateDeletePost;
