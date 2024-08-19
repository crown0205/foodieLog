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

const LoginScreen = () => {
  const [value, setValues] = useState({
    email: '',
    password: '',
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <InputField
          inputMode="email"
          value={value.email}
          onChangeText={text => setValues({...value, email: text})}
          onBlur={() => setTouched({...touched, email: true})}
          returnKeyType="next"
          placeholder="이메일"
          error={'이메일 형식이 아닙니다.'}
          touched={touched.email}
        />
        <InputField
          value={value.password}
          onChangeText={text => setValues({...value, password: text})}
          onBlur={() => setTouched({...touched, password: true})}
          returnKeyType="done"
          placeholder="비밀번호"
          error={'비밀번호를 입력해주세요.'}
          touched={touched.password}
          secureTextEntry // 비밀번호 입력 시 암호화
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
