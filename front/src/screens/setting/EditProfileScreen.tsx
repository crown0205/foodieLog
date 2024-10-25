import { BASE_URL } from '@/api/axios';
import InputField from '@/components/common/InputField';
import { colors, errorMessages } from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import useForm from '@/hooks/useForm';
import useImagePicker from '@/hooks/useImagePicker';
import useModal from '@/hooks/useModal';
import { SettingStackParamList } from '@/navigations/stack/SettingStackNavigator';
import { validateEditProfile } from '@/utils';
import { StackScreenProps } from '@react-navigation/stack';
import { useEffect } from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EditProfileHeaderRight from './EditProfileHeaderRight';
import EditProfileImageOption from './EditProfileImageOption';

type EditProfileScreenProps = StackScreenProps<SettingStackParamList>;

function EditProfileScreen({ navigation }: EditProfileScreenProps) {
  const { getProfileQuery, profileMutation } = useAuth();
  const { nickname, imageUrl, kakaoImageUrl } = getProfileQuery.data || {};
  const imageOption = useModal();

  const imagePicker = useImagePicker({
    initialImages: imageUrl ? [{ url: imageUrl }] : [],
    mode: 'single',
    onSettled: imageOption.hide,
  });

  const editProfile = useForm({
    initialValues: { nickname: nickname ?? '' },
    validate: validateEditProfile,
  });

  const handlePressImage = () => {
    imageOption.show();
    Keyboard.dismiss();
  };

  const handleSubmit = () => {
    if (nickname === editProfile.values.nickname) {
      Toast.show({
        type: 'error',
        text1: '변경된 정보가 없습니다.',
        position: 'bottom',
        visibilityTime: 2000,
      });
      return;
    }

    if (editProfile.errors.nickname) {
      Toast.show({
        type: 'error',
        text1: editProfile.errors.nickname,
        position: 'bottom',
        visibilityTime: 2000,
      });
      return;
    }

    profileMutation.mutate(
      { ...editProfile.values, imageUrl: imagePicker.imageUrls[0].url },
      {
        onSuccess: () => {
          Toast.show({
            type: 'success',
            text1: '프로필 수정 완료',
            position: 'bottom',
          });
          navigation.goBack();
        },
        onError: error => {
          Toast.show({
            type: 'error',
            text1:
              error.response?.data.message || errorMessages.UNEXPECTED_ERROR,
            position: 'bottom',
            visibilityTime: 2000,
          });
        },
      },
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => EditProfileHeaderRight(handleSubmit),
    });
  }, [handleSubmit, navigation]);

  if (imagePicker.isUploading) {
    return <ActivityIndicator size="large" color={colors.BLUE_500} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Pressable
          style={[styles.imageContainer, styles.emptyImageContainer]}
          onPress={handlePressImage}
        >
          {imagePicker.imageUrls.length === 0 && !kakaoImageUrl && (
            <Ionicons name="camera-outline" size={30} color={colors.GREY_500} />
          )}
          {imagePicker.imageUrls.length === 0 && kakaoImageUrl && (
            <>
              <Image style={styles.item} source={{ uri: kakaoImageUrl }} />
              <View style={styles.cameraButton}>
                <Ionicons name="camera" size={18} color={colors.WHITE} />
              </View>
            </>
          )}
          {imagePicker.imageUrls.length > 0 && (
            <>
              <Image
                style={styles.item}
                source={{ uri: `${BASE_URL}${imagePicker.imageUrls[0].url}` }}
              />
              <View style={styles.cameraButton}>
                <Ionicons name="camera" size={18} color={colors.WHITE} />
              </View>
            </>
          )}
        </Pressable>
      </View>

      <InputField
        {...editProfile.getTextInputProps('nickname')}
        error={editProfile.errors.nickname}
        touched={editProfile.touched.nickname}
        placeholder="닉네임을 입력해주세요."
      />

      <Pressable style={styles.deleteAccountContainer}>
        <Ionicons
          name="lock-closed-outline"
          size={18}
          color={colors.GREY_500}
        />
        <Text style={styles.deleteAccountText}>회원탈퇴</Text>
      </Pressable>

      <EditProfileImageOption
        isVisible={imageOption.isVisible}
        hideOption={imageOption.hide}
        onChangeImage={imagePicker.handleChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImageContainer: {
    borderWidth: 1,
    borderColor: colors.GREY_200,
  },
  item: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 1,
    right: 1,
    backgroundColor: colors.BLUE_500,
    padding: 5,
    borderRadius: 50,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteAccountContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    right: 20,
    bottom: 30,
    borderRadius: 10,
    padding: 10,
  },
  deleteAccountText: {
    marginLeft: 10,
    color: colors.GREY_500,
  },
});

export default EditProfileScreen;
