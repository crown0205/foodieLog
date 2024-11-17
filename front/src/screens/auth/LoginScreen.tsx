import CustomButton from '@/components/common/CustomButton';
import InputField from '@/components/common/InputField';
import { errorMessages } from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import useForm from '@/hooks/useForm';
import { validateLogin } from '@/utils';
import React, { useRef } from 'react';
import { SafeAreaView, StyleSheet, TextInput, View } from 'react-native';
import Toast from 'react-native-toast-message';

const LoginScreen = () => {
  const { loginMutation } = useAuth();
  const passwordRef = useRef<TextInput | null>(null);

  const login = useForm({
    initialValues: { email: '', password: '' },
    validate: validateLogin,
  });

  const handleSubmit = () => {
    loginMutation.mutate(login.values, {
      onError: error =>
        Toast.show({
          type: 'error',
          text1: error.response?.data.message || errorMessages.UNEXPECTED_ERROR,
          position: 'bottom',
          visibilityTime: 2000,
        }),
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          inputMode="email"
          {...login.getTextInputProps('email')}
          returnKeyType="next"
          placeholder="이메일"
          error={login.errors.email}
          touched={login.touched.email}
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
        <InputField
          ref={passwordRef}
          {...login.getTextInputProps('password')}
          returnKeyType="join"
          placeholder="비밀번호"
          error={login.errors.password}
          touched={login.touched.password}
          secureTextEntry // 비밀번호 입력 시 암호화
          onSubmitEditing={handleSubmit}
        />

        <CustomButton
          label="로그인"
          variant="filled"
          size="large"
          onPress={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 20,
  },
});
