import CustomButton from '@/components/common/CustomButton';
import { authNavigations } from '@/constants/navigations';
import { AuthStackParamList } from '@/navigations/stack/AuthStackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_HOME
>;

const AuthHomeScreen = ({ navigation }: AuthHomeScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          resizeMode="contain"
          style={styles.logo}
          source={require('@/assets/foodiLog.png')}
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          label="카카오 로그인하기"
          variant="filled"
          size="large"
          onPress={() => navigation.navigate(authNavigations.KAKAO)}
          style={styles.kakaoButtonContainer}
          textStyle={styles.kakaoButtonText}
          icon={
            <Ionicons name="chatbubble-sharp" color={'#181600'} size={16} />
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

const styles = StyleSheet.create({
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
    color: '#181600',
  },
});
