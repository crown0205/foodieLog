import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {View, Text} from 'react-native';
import MapHomeScreen from '../../screens/MapHomeScreen';

const Drawer = createDrawerNavigator();

const MainDrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="MapHome" component={MapHomeScreen} />
    </Drawer.Navigator>
  );
};

export default MainDrawerNavigator;
