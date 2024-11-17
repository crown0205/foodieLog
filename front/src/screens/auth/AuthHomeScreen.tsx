import CustomButton from '@/components/common/CustomButton';
import { colors } from '@/constants';
import { authNavigations } from '@/constants/navigations';
import useAuth from '@/hooks/queries/useAuth';
import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { deviceType } from '@/utils';
import appleAuth, {
  AppleButton,
} from '@invertase/react-native-apple-authentication';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';

type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_HOME
>;

const AuthHomeScreen = ({ navigation }: AuthHomeScreenProps) => {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  const { appleLoginMutation } = useAuth();

  const handlePressAppleLogin = async () => {
    try {
      const { identityToken, fullName } = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      if (identityToken) {
        appleLoginMutation.mutate({
          identityToken,
          appId: 'org.reactjs.native.example.foodiLog',
          nickname: fullName?.givenName ?? null,
        });
      }
    } catch (error: any) {
      if (error.code !== appleAuth.Error.CANCELED) {
        Toast.show({
          type: 'error',
          text1: '애플 로그인이 실패헸습니다.',
          text2: '나중에 다시 시도해주세요.',
        });
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <FastImage
          resizeMode="contain"
          style={styles.logo}
          source={require('@/assets/foodiLog.png')}
        />
      </View>
      <View style={styles.buttonContainer}>
        {deviceType === 'ios' && (
          <AppleButton
            buttonStyle={AppleButton.Style.BLACK}
            buttonType={AppleButton.Type.SIGN_IN}
            style={styles.appleButton}
            cornerRadius={5}
            onPress={handlePressAppleLogin}
          />
        )}
        <CustomButton
          label="카카오 로그인하기"
          variant="filled"
          size="large"
          onPress={() => navigation.navigate(authNavigations.KAKAO)}
          style={styles.kakaoButtonContainer}
          textStyle={styles.kakaoButtonText}
          icon={
            <Ionicons
              name="chatbubble-sharp"
              color={colors[theme].BLACK}
              size={16}
            />
          }
        />

        <CustomButton
          label="로그인화면으로 이동"
          onPress={() => navigation.navigate(authNavigations.LOGIN)}
        />
        <CustomButton
          label="회원가입으로 이동"
          variant="outlined"
          onPress={() => navigation.navigate(authNavigations.SIGNUP)}
        />
      </View>
    </SafeAreaView>
  );
};

export default AuthHomeScreen;

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 20,
    },
    logoContainer: {
      flex: 1,
      marginTop: 50,
      width: Dimensions.get('screen').width / 1.8,
    },
    logo: {
      width: '100%',
      height: '100%',
    },
    buttonContainer: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      gap: 10,
      marginBottom: 40,
    },
    kakaoButtonContainer: {
      backgroundColor: '#fee503',
    },
    kakaoButtonText: {
      color: colors[theme].BLACK,
    },
    appleButton: {
      width: Dimensions.get('screen').width - 40,
      height: 45,
      paddingVertical: 25,
    },
  });
