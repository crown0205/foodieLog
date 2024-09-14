import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import useAuth from '@/hooks/queries/useAuth';
import useForm from '@/hooks/useForm';
import {validateSignUp} from '@/utils';
import React, {useRef} from 'react';
import {SafeAreaView, StyleSheet, TextInput, View} from 'react-native';

const SignUpScreen = () => {
  const {signupMutation, loginMutation} = useAuth();
  const passwordRef = useRef<TextInput | null>(null);
  const passwordConfirmRef = useRef<TextInput | null>(null);

  const signup = useForm({
    initialValues: {email: '', password: '', passwordConfirm: ''},
    validate: validateSignUp,
  });

  const handleSubmit = () => {
    const {email, password} = signup.values;

    signupMutation.mutate(
      {email, password},
      {
        onSuccess: () => loginMutation.mutate({email, password}),
      },
    );
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
          blurOnSubmit={false} // NOTE : 확인 버튼 클릭 시 키보드 사라지지 않도록 설정
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
        <InputField
          ref={passwordRef}
          {...signup.getTextInputProps('password')}
          returnKeyType="next"
          placeholder="비밀번호"
          error={signup.errors.password}
          touched={signup.touched.password}
          secureTextEntry
          blurOnSubmit={false}
          onSubmitEditing={() => passwordConfirmRef.current?.focus()}
        />
        <InputField
          ref={passwordConfirmRef}
          {...signup.getTextInputProps('passwordConfirm')}
          returnKeyType="done"
          placeholder="비밀번호 확인"
          error={signup.errors.passwordConfirm}
          touched={signup.touched.passwordConfirm}
          secureTextEntry
          onSubmitEditing={handleSubmit}
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
