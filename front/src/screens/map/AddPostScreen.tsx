import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

import { RequestCreatePost } from '@/api';
import AddPostHeaderRight from '@/components/AddPostHeaderRight';
import CustomButton from '@/components/CustomButton';
import DatePickerOption from '@/components/DatePickerOption';
import ImageInput from '@/components/ImageInput';
import InputField from '@/components/InputField';
import MarkerSelector from '@/components/MarkerSelector';
import PreviewImageList from '@/components/PreviewImageList';
import ScoreInputSlider from '@/components/ScoreInputSlider';
import { colors } from '@/constants';
import useMutateCreatePost from '@/hooks/queries/useMutateCreatePost';
import useForm from '@/hooks/useForm';
import useGetAddress from '@/hooks/useGetAddress';
import useImagePicker from '@/hooks/useImagePicker';
import useModal from '@/hooks/useModal';
import usePermission from '@/hooks/usePermission';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import { MarkerColor } from '@/types/domain';
import { validateAddPost } from '@/utils';
import { getDateWithSeparator } from '@/utils/date';

type AddPostScreenProps = StackScreenProps<MapStackParamList, 'AddPost'>;

const AddPostScreen = ({ route, navigation }: AddPostScreenProps) => {
  const { location } = route.params;
  const descriptionRef = useRef<TextInput | null>(null);
  const createPost = useMutateCreatePost();
  const address = useGetAddress(location);
  const addPost = useForm({
    initialValues: { title: '', description: '' },
    validate: validateAddPost,
  });
  const [markerColor, setMarkerColor] = useState<MarkerColor>('RED');
  const [score, serScore] = useState<number>(4);

  const [date, setDate] = useState<Date>(new Date());
  const datePickerModal = useModal();
  const [isDatePicked, setIsDatePicked] = useState<boolean>(false);

  const imagePicker = useImagePicker({ initialImages: [] });
  usePermission('PHOTO');

  console.log({ imagePicker: imagePicker.imageUrls });

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
      imageUrls: [],
      address,
      date: new Date(),
      ...location,
    };

    createPost.mutate(body, {
      onSuccess: () => navigation.goBack(),
      onError: error => console.log(error.response?.data.message),
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => AddPostHeaderRight(handleSubmit),
    });
  });

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
              isDatePicked ? `${getDateWithSeparator(date, '. ')}` : '날짜 선택'
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

export default AddPostScreen;
