import CustomButton from '@/components/CustomButton';
import useAuth from '@/hooks/queries/useAuth';
import React from 'react';
import {Text, View} from 'react-native';

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
