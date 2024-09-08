import React from 'react';
import {View, Text} from 'react-native';
import CustomButton from '../../components/CustomButton';
import useAuth from '../../hooks/queries/useAuth';

const MapHomeScreen = () => {
  const {logoutMutation} = useAuth();
  return (
    <View>
      <Text>MapHomeScreen</Text>
      <CustomButton
        label="로그아웃"
        onPress={() => logoutMutation.mutate(null)}
      />
    </View>
  );
};

export default MapHomeScreen;
