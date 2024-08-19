import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  Button,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {authNavigations} from '../../constants/navigations';
import {AuthStackParamList} from '../../navigations/stack/AuthStackNavigator';
import CustomButton from '../../components/CustomButton';

type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_HOME
>;

const AuthHomeScreen = ({navigation}: AuthHomeScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          resizeMode="contain"
          style={styles.logo}
          source={require('../../assets/foodiLog.png')}
        />
      </View>
      <View style={styles.buttonContainer}>
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
    width: Dimensions.get('screen').width / 2,
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
    marginBottom: 20,
  },
});
