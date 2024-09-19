import { MapNavigations } from '@/constants/navigations';
import AddPostScreen from '@/screens/map/AddPostScreen';
import MapHomeScreen from '@/screens/map/MapHomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { LatLng } from 'react-native-maps';

export type MapStackParamList = {
  [MapNavigations.MAP_HOME]: undefined;
  [MapNavigations.ADD_POST]: { location: LatLng };
};

const Stack = createStackNavigator<MapStackParamList>();

const MapStackNavigator = () => {
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
        name={MapNavigations.MAP_HOME}
        component={MapHomeScreen}
        options={{
          headerTitle: ' ', // 헤더 타이틀을 공백으로 설정
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={MapNavigations.ADD_POST}
        component={AddPostScreen}
        options={{
          headerTitle: '장소 추가',
        }}
      />
    </Stack.Navigator>
  );
};

export default MapStackNavigator;
