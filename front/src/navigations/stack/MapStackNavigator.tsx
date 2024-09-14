import {MapNavigations} from '@/constants/navigations';
import MapHomeScreen from '@/screens/map/MapHomeScreen';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

export type MapStackParamList = {
  [MapNavigations.MAP_HOME]: undefined;
};

const Stack = createStackNavigator<MapStackParamList>();

const MapStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {backgroundColor: 'white'},
        headerStyle: {
          backgroundColor: 'white',
          shadowColor: 'gray',
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: 'black',
      }}>
      <Stack.Screen
        name={MapNavigations.MAP_HOME}
        component={MapHomeScreen}
        options={{
          headerTitle: ' ', // 헤더 타이틀을 공백으로 설정
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MapStackNavigator;
