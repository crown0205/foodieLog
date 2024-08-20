import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import useForm from '../../hooks/useForm';
import {validateLogin} from '../../utils';

const LoginScreen = () => {
  const login = useForm({
    initialValues: {email: '', password: ''},
    validate: validateLogin,
  });
  const handleSubmit = () => {
    console.log('submit', login.values);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          inputMode="email"
          {...login.getTextInputProps('email')}
          returnKeyType="next"
          placeholder="이메일"
          error={login.errors.email}
          touched={login.touched.email}
        />
        <InputField
          {...login.getTextInputProps('password')}
          returnKeyType="done"
          placeholder="비밀번호"
          error={login.errors.password}
          touched={login.touched.password}
          secureTextEntry // 비밀번호 입력 시 암호화
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
