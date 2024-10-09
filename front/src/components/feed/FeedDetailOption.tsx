import { alerts } from '@/constants';
import useMutateDeletePost from '@/hooks/queries/useMutateDeletePost';
import useDetailPostStore from '@/store/useDetailPostStore';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { CompoundOption } from '../common/CompoundOption';

interface FeedDetailOptionProps {
  isVisible: boolean;
  hideOption: () => void;
}

function FeedDetailOption({ isVisible, hideOption }: FeedDetailOptionProps) {
  const navigation = useNavigation();
  const deletePost = useMutateDeletePost();
  const { detailPost } = useDetailPostStore();

  const handleDeletePost = () => {
    if (!detailPost) return;

    Alert.alert(alerts.DELETE_POST.TITLE, alerts.DELETE_POST.DESCRIPTION, [
      {
        text: '삭제',
        style: 'destructive',
        onPress: () =>
          deletePost.mutate(detailPost.id, {
            onSuccess: () => {
              hideOption();
              navigation.goBack();
            },
          }),
      },
      {
        text: '취소',
        style: 'cancel',
      },
    ]);
  };

  return (
    <CompoundOption isVisible={isVisible} hideOption={hideOption}>
      <CompoundOption.Background>
        <CompoundOption.Container>
          <CompoundOption.Button isDanger onPress={handleDeletePost}>
            삭제하기
          </CompoundOption.Button>
          <CompoundOption.Divider />
          <CompoundOption.Button>수정하기</CompoundOption.Button>
        </CompoundOption.Container>
        <CompoundOption.Container>
          <CompoundOption.Button onPress={hideOption}>
            취소
          </CompoundOption.Button>
        </CompoundOption.Container>
      </CompoundOption.Background>
    </CompoundOption>
  );
}

export default FeedDetailOption;
