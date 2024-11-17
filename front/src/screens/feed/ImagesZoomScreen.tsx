import ImageCarousel from '@/components/common/ImageCarousel';
import { feedNavigations } from '@/constants';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';
import useDetailPostStore from '@/store/useDetailPostStore';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';

type ImageZoomScreenProps = StackScreenProps<
  FeedStackParamList,
  typeof feedNavigations.IMAGE_ZOOM
>;

const ImagesZoomScreen = ({ route }: ImageZoomScreenProps) => {
  const { index: pressedIndex } = route.params;
  const { detailPost } = useDetailPostStore();

  return (
    <ImageCarousel
      images={detailPost?.images ?? []}
      pressedIndex={pressedIndex}
    />
  );
};

export default ImagesZoomScreen;
