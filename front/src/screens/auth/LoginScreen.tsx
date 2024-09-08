import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import CustomButton from '../../components/CustomButton';
import InputField from '../../components/InputField';
import useAuth from '../../hooks/queries/useAuth';
import useForm from '../../hooks/useForm';
import {validateLogin} from '../../utils';

const LoginScreen = () => {
  const {loginMutation} = useAuth();
  const passwordRef = useRef<TextInput | null>(null);

  const login = useForm({
    initialValues: {email: '', password: ''},
    validate: validateLogin,
  });
  const handleSubmit = () => {
    console.log('로그인 버튼 클릭 ', login.values);
    loginMutation.mutate(login.values);
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
