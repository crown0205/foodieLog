import { colorHex, colors, errorMessages } from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import useForm from '@/hooks/useForm';
import { SettingStackParamList } from '@/navigations/stack/SettingStackNavigator';
import { MarkerColor } from '@/types/domain';
import { validateEditCategory } from '@/utils';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import InputField from '../common/InputField';
import EditCategoryHeaderRight from './EditCategoryHeaderRight';
import useThemeStorage from '@/hooks/useThemeStorage';
import { ThemeMode } from '@/types';

const categoryList: MarkerColor[] = [
  'RED',
  'YELLOW',
  'GREEN',
  'BLUE',
  'PURPLE',
];

const categoryPlaceholder = [
  'ex) 식당',
  'ex) 카페',
  'ex) 병원',
  'ex) 학교',
  'ex) 회사',
];

type EditCategoryScreenProps = StackScreenProps<SettingStackParamList>;

function EditCategoryScreen({ navigation }: EditCategoryScreenProps) {
  const { theme } = useThemeStorage();
  const styles = styling(theme);
  const refArray = useRef<(TextInput | null)[]>([]);
  const { getProfileQuery, categoryMutation } = useAuth();
  const { categories } = getProfileQuery.data || {};
  const category = useForm({
    initialValues: {
      RED: categories?.RED ?? '',
      YELLOW: categories?.YELLOW ?? '',
      GREEN: categories?.GREEN ?? '',
      BLUE: categories?.BLUE ?? '',
      PURPLE: categories?.PURPLE ?? '',
    },
    validate: validateEditCategory,
  });

  const handleSubmit = () => {
    categoryMutation.mutate(category.values, {
      onSuccess: () => {
        Toast.show({
          type: 'success',
          text1: '카테고리 수정 완료',
          position: 'bottom',
        });
        navigation.goBack();
      },
      onError: error => {
        Toast.show({
          type: 'error',
          text1: error.response?.data.message || errorMessages.UNEXPECTED_ERROR,
          position: 'bottom',
        });
      },
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => EditCategoryHeaderRight(handleSubmit),
    });
  }, [handleSubmit]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.contentContainer}
        scrollIndicatorInsets={{ right: 1 }}
      >
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            마커의 색상의 카테고리를 설정 해주세요.
          </Text>
          <Text style={styles.infoText}>
            마커 필터링, 범례 표시에 사용할 수 있어요.
          </Text>
        </View>

        <View style={styles.formContainer}>
          {categoryList.map((color, idx) => (
            <View key={idx} style={styles.categoryContainer}>
              <View
                style={[styles.category, { backgroundColor: colorHex[color] }]}
              />
              <View style={styles.inputContainer}>
                <InputField
                  {...category.getTextInputProps(color)}
                  ref={el => (refArray.current[idx] = el as TextInput)}
                  error={category.errors[color]}
                  touched={category.touched[color]}
                  placeholder={categoryPlaceholder[idx]}
                  autoFocus={color === 'RED'}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => {
                    refArray.current[idx + 1]?.focus();
                  }}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      flex: 1,
      padding: 20,
      marginBottom: 20,
    },
    infoContainer: {
      alignItems: 'center',
      marginTop: 10,
      marginBottom: 30,
      borderWidth: 1,
      borderColor: colors[theme].BLUE_500,
      borderRadius: 3,
      padding: 10,
      gap: 10,
    },
    infoText: {
      fontSize: 16,
      color: colors[theme].BLUE_500,
      fontWeight: 'bold',
    },
    formContainer: {
      gap: 10,
    },
    categoryContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginBottom: 10,
    },
    category: {
      width: 20,
      height: 20,
      borderRadius: 10,
      marginRight: 10,
      backgroundColor: colors[theme].RED_400,
    },
    inputContainer: {
      flex: 1,
    },
  });

export default EditCategoryScreen;
