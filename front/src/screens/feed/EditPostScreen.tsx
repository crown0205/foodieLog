import PostForm from '@/components/post/PostForm';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';

type EditPostScreenProps = StackScreenProps<FeedStackParamList, 'EditPost'>;

function EditPostScreen({ route }: EditPostScreenProps) {
  const { location } = route.params;

  return <PostForm location={location} />;
}

export default EditPostScreen;
