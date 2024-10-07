import { createPost } from '@/api';
import queryClient from '@/api/queryClient';
import { queryKeys } from '@/constants';
import { UseMutationCustomOptions } from '@/types/common';
import { Marker } from '@/types/domain';
import { useMutation } from '@tanstack/react-query';

function useMutateCreatePost(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: createPost,
    onSuccess: newPost => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.POST, queryKeys.GET_POSTS],
      });

      // NOTE : 기존의 marker 데이터를 가져와서 새로운 marker 데이터를 추가 ( 불필요한 API 요청을 줄이기 위함 )
      queryClient.setQueryData<Marker[]>(
        [queryKeys.MARKER, queryKeys.GET_MARKERS],
        prevMarkers => {
          const newMarker: Marker & { score: number } = {
            id: newPost.id,
            latitude: newPost.latitude,
            longitude: newPost.longitude,
            color: newPost.color,
            score: newPost.score,
          };

          return prevMarkers ? [...prevMarkers, newMarker] : [newMarker];
        },
      );
    },
    ...mutationOptions,
  });
}

export default useMutateCreatePost;
