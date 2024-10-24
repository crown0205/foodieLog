import { authNavigations } from '@/constants/navigations';
import AuthHomeScreen from '@/screens/auth/AuthHomeScreen';
import KakaoLoginScreen from '@/screens/auth/KakaoLoginScreen';
import LoginScreen from '@/screens/auth/LoginScreen';
import SignUpScreen from '@/screens/auth/SignUpScreen';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

export type AuthStackParamList = {
  [authNavigations.AUTH_HOME]: undefined;
  [authNavigations.LOGIN]: undefined;
  [authNavigations.SIGNUP]: undefined;
  [authNavigations.KAKAO]: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: 'white' },
        headerStyle: {
          backgroundColor: 'white',
          shadowColor: 'gray',
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: 'black',
      }}
    >
      <Stack.Screen
        name={authNavigations.AUTH_HOME}
        component={AuthHomeScreen}
        options={{
          headerTitle: ' ', // 헤더 타이틀을 공백으로 설정
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={authNavigations.LOGIN}
        component={LoginScreen}
        options={{
          headerTitle: '로그인',
        }}
      />
      <Stack.Screen
        name={authNavigations.SIGNUP}
        component={SignUpScreen}
        options={{
          headerTitle: '회원가입',
        }}
      />
      <Stack.Screen
        name={authNavigations.KAKAO}
        component={KakaoLoginScreen}
        options={{
          headerTitle: '카카오 로그인',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
