import FeedHomeHeaderLeft from '@/components/feed/FeedHomeHeaderLeft';
import { colors, mainNavigations } from '@/constants';
import CalendarHomeScreen from '@/screens/calender/CalendarHomeScreen';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigatorScreenParams, RouteProp } from '@react-navigation/native';
import React from 'react';
import { Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapStackNavigator, {
  MapStackParamList,
} from '../stack/MapStackNavigator';
import SettingStackNavigator, {
  SettingStackParamList,
} from '../stack/SettingStackNavigator';
import FeedTabNavigator, { FeedTabParamList } from '../tab/FeedTabNavigator';
import CustomDrawerContent from './CustomDrawerContent';

export type MainDrawerParamList = {
  [mainNavigations.HOME]: NavigatorScreenParams<MapStackParamList>;
  [mainNavigations.FEED]: NavigatorScreenParams<FeedTabParamList>;
  [mainNavigations.CALENDAR]: undefined;
  [mainNavigations.SETTING]: NavigatorScreenParams<SettingStackParamList>;
};

const Drawer = createDrawerNavigator();

function DrawerIcons(
  route: RouteProp<MainDrawerParamList>,
  focused: boolean,
  theme: ThemeMode,
) {
  let iconName = '';

  switch (route.name) {
    case mainNavigations.HOME:
      iconName = 'home';
      break;
    case mainNavigations.FEED:
      iconName = 'feed';
      break;
    case mainNavigations.CALENDAR:
      iconName = 'event-note';
      break;
    case mainNavigations.SETTING:
      iconName = 'settings';
      break;
  }

  return (
    <MaterialIcons
      name={iconName}
      color={focused ? colors[theme].BLUE_600 : colors[theme].GREY_600}
      size={20}
    />
  );
}

const MainDrawerNavigator = () => {
  const { theme } = useThemeStore();

  return (
    <Drawer.Navigator
      drawerContent={CustomDrawerContent}
      screenOptions={({ route }) => ({
        headerShown: false,
        drawerType: 'front',
        drawerStyle: {
          width: Dimensions.get('screen').width * 0.6,
          backgroundColor: colors[theme].WHITE,
        },
        drawerActiveBackgroundColor: colors[theme].BLUE_50,
        drawerActiveTintColor: colors[theme].BLUE_600,
        drawerInactiveTintColor: colors[theme].GREY_600,
        drawerInactiveBackgroundColor: colors[theme].WHITE,
        drawerLabelStyle: {
          fontWeight: '600',
        },
        drawerIcon: ({ focused }) =>
          DrawerIcons(
            route as RouteProp<MainDrawerParamList, keyof MainDrawerParamList>,
            focused,
            theme,
          ),
      })}
    >
      <Drawer.Screen
        name={mainNavigations.HOME}
        component={MapStackNavigator}
        options={{
          title: '홈',
          swipeEnabled: false,
        }}
      />
      <Drawer.Screen
        name={mainNavigations.FEED}
        component={FeedTabNavigator}
        options={{ title: '피드' }}
      />
      <Drawer.Screen
        name={mainNavigations.CALENDAR}
        component={CalendarHomeScreen}
        options={({ navigation }) => ({
          title: '캘린더',
          headerShown: true,
          headerLeft: () => FeedHomeHeaderLeft(navigation),
          headerStyle: {
            backgroundColor: colors[theme].WHITE,
            shadowColor: colors[theme].GREY_200,
          },
          headerTitleStyle: {
            fontSize: 15,
          },
        })}
      />
      <Drawer.Screen
        name={mainNavigations.SETTING}
        component={SettingStackNavigator}
        options={{
          title: '설정',
          drawerItemStyle: {
            height: 0,
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default MainDrawerNavigator;
