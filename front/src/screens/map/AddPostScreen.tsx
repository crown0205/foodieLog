import { StackScreenProps } from '@react-navigation/stack';
import React, { useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import { colors } from '@/constants';
import useForm from '@/hooks/useForm';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import { validateAddPost } from '@/utils';

type AddPostScreenProps = StackScreenProps<MapStackParamList, 'AddPost'>;

const AddPostScreen = ({ route }: AddPostScreenProps) => {
  const { location } = route.params;
  const descriptionRef = useRef<TextInput | null>(null);
  const addPost = useForm({
    initialValues: { title: '', description: '' },
    validate: validateAddPost,
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.contentContainer}
        scrollIndicatorInsets={{ right: 1 }}
      >
        <View style={styles.inputContainer}>
          <InputField
            value=""
            disabled
            icon={
              <Octicons name="location" size={16} color={colors.GREY_500} />
            }
          />
          <CustomButton size="large" variant="outlined" label="날짜 선택" />
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
});

export default AddPostScreen;
