import React from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import InputField from '../../components/InputField';
import useForm from '../../hooks/useForm';
import CustomButton from '../../components/CustomButton';
import {validateSignUp} from '../../utils';

const SignUpScreen = () => {
  const signup = useForm({
    initialValues: {email: '', password: '', passwordConfirm: ''},
    validate: validateSignUp,
  });

  const handleSubmit = () => {
    console.log('submit', signup.values);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          autoFocus
          inputMode="email"
          {...signup.getTextInputProps('email')}
          returnKeyType="next"
          placeholder="이메일"
          error={signup.errors.email}
          touched={signup.touched.email}
        />
        <InputField
          {...signup.getTextInputProps('password')}
          returnKeyType="next"
          placeholder="비밀번호"
          error={signup.errors.password}
          touched={signup.touched.password}
          secureTextEntry
        />
        <InputField
          {...signup.getTextInputProps('passwordConfirm')}
          returnKeyType="done"
          placeholder="비밀번호 확인"
          error={signup.errors.passwordConfirm}
          touched={signup.touched.passwordConfirm}
          secureTextEntry
        />
      </View>
      <CustomButton label="회원가입" onPress={handleSubmit} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 50,
  },
});

export default SignUpScreen;
