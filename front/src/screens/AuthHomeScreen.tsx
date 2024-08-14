import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Button, SafeAreaView, View} from 'react-native';
import {authNavigations} from '../constants';
import {AuthStackParamList} from '../navigations/stack/AuthStackNavigator';

type AuthHomeScreenProps = StackScreenProps<
  AuthStackParamList,
  typeof authNavigations.AUTH_HOME
>;

const AuthHomeScreen = ({navigation}: AuthHomeScreenProps) => {
  return (
    <SafeAreaView>
      <View>
        <Button
          title="로그인화면으로 이동"
          onPress={() => navigation.navigate(authNavigations.LOGIN)}
        />
      </View>
    </SafeAreaView>
  );
};

export default AuthHomeScreen;
