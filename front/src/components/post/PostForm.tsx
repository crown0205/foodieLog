import { RequestCreatePost } from '@/api';
import { colors } from '@/constants';
import useMutateCreatePost from '@/hooks/queries/useMutateCreatePost';
import useForm from '@/hooks/useForm';
import useGetAddress from '@/hooks/useGetAddress';
import useImagePicker from '@/hooks/useImagePicker';
import useModal from '@/hooks/useModal';
import usePermission from '@/hooks/usePermission';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';
import { MarkerColor } from '@/types/domain';
import { getDateWithSeparator, validateAddPost } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { LatLng } from 'react-native-maps';
import Octicons from 'react-native-vector-icons/Octicons';
import CustomButton from '../common/CustomButton';
import InputField from '../common/InputField';
import PreviewImageList from '../common/PreviewImageList';
import AddPostHeaderRight from './AddPostHeaderRight';
import DatePickerOption from './DatePickerOption';
import ImageInput from './ImageInput';
import MarkerSelector from './MarkerSelector';
import ScoreInputSlider from './ScoreInputSlider';
import useDetailPostStore from '@/store/useDetailPostStore';
import useMutateUpdatePost from '@/hooks/queries/useMutateUpdatePost';

interface PostFormProps {
  isEdit?: boolean;
  location: LatLng;
}

const PostForm = ({ isEdit = false, location }: PostFormProps) => {
  const navigation = useNavigation<StackNavigationProp<FeedStackParamList>>();
  const descriptionRef = useRef<TextInput | null>(null);
  const createPost = useMutateCreatePost();
  const updatePost = useMutateUpdatePost();
  const { detailPost } = useDetailPostStore();
  const isEditMode = isEdit && detailPost;
  const address = useGetAddress(location);
  const addPost = useForm({
    initialValues: {
      title: isEditMode ? detailPost.title : '',
      description: isEditMode ? detailPost.description : '',
    },
    validate: validateAddPost,
  });
  const [markerColor, setMarkerColor] = useState<MarkerColor>(
    isEditMode ? detailPost.color : 'RED',
  );
  const [score, serScore] = useState<number>(isEditMode ? detailPost.score : 4);

  const [date, setDate] = useState<Date>(
    isEditMode ? new Date(String(detailPost.date)) : new Date(),
  );
  const datePickerModal = useModal();
  const [isDatePicked, setIsDatePicked] = useState<boolean>(false);

  const imagePicker = useImagePicker({
    initialImages: isEditMode ? detailPost.images : [],
  });
  usePermission('PHOTO');

  const handleDateChange = (pickedDate: Date) => {
    setDate(pickedDate);
  };

  const handleConfirmDate = () => {
    setIsDatePicked(true);
    datePickerModal.hide();
  };

  const handleSelectMarker = (name: MarkerColor) => {
    setMarkerColor(name);
  };

  const handleChangeScore = (score: number) => {
    serScore(score);
  };

  const handleSubmit = () => {
    const body: RequestCreatePost = {
      title: addPost.values.title,
      description: addPost.values.description,
      color: markerColor,
      score,
      imageUrls: imagePicker.imageUrls,
      address,
      date,
      ...location,
    };

    if (isEditMode) {
      updatePost.mutate(
        {
          id: detailPost.id,
          body,
        },
        {
          onSuccess: () => navigation.goBack(),
          onError: error =>
            console.error('UPDATE_POST', error.response?.data.message),
        },
      );
      return;
    }

    createPost.mutate(body, {
      onSuccess: () => navigation.goBack(),
      onError: error =>
        console.error('CREATE_POST', error.response?.data.message),
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => AddPostHeaderRight(handleSubmit),
    });
  }, [handleSubmit, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.contentContainer}
        scrollIndicatorInsets={{ right: 1 }}
      >
        <View style={styles.inputContainer}>
          <InputField
            value={address}
            disabled
            icon={
              <Octicons name="location" size={16} color={colors.GREY_500} />
            }
          />
          <CustomButton
            size="large"
            variant="outlined"
            label={
              isDatePicked || isEditMode
                ? `${getDateWithSeparator(date, '. ')}`
                : '날짜 선택'
            }
            onPress={datePickerModal.show}
          />
          <InputField
            {...addPost.getTextInputProps('title')}
            error={addPost.errors.title}
            touched={addPost.touched.title}
            placeholder="제목을 입력하세요."
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => {
              descriptionRef.current?.focus();
            }}
          />
          <InputField
            {...addPost.getTextInputProps('description')}
            error={addPost.errors.description}
            touched={addPost.touched.description}
            ref={descriptionRef}
            placeholder="기록하고 싶은 내용을 입력하세요. (선택)"
            returnKeyType="next"
            multiline
          />

          <MarkerSelector
            markerColor={markerColor}
            onPressMarker={handleSelectMarker}
            score={score}
          />
          <ScoreInputSlider score={score} onChangeScore={handleChangeScore} />
          <View style={styles.imagesViewer}>
            {imagePicker.imageUrls.length !== 5 && (
              <ImageInput onChange={imagePicker.handleChange} />
            )}
            <PreviewImageList
              imageUrls={imagePicker.imageUrls}
              onDelete={imagePicker.delete}
              onChangeOrder={imagePicker.changeOrder}
              showOption
            />
          </View>
          <Text style={styles.notice}>
            * 이미지 클릭시 순서 변경, 삭제 가능합니다. (최대 5장)
          </Text>

          <DatePickerOption
            date={date}
            isVisible={datePickerModal.isVisible}
            onChangeDate={handleDateChange}
            onConfirmDate={handleConfirmDate}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 20,
  },
  imagesViewer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  notice: {
    fontSize: 13,
    color: colors.GREY_500,
    textAlign: 'left',
  },
});

export default PostForm;
