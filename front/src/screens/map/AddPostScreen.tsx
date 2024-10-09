import PostForm from '@/components/post/PostForm';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';

type AddPostScreenProps = StackScreenProps<MapStackParamList, 'AddPost'>;

const AddPostScreen = ({ route }: AddPostScreenProps) => {
  const { location } = route.params;
  return <PostForm location={location} />;
};

export default AddPostScreen;
