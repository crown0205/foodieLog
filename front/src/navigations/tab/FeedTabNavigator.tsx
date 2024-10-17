import FeedHomeHeaderLeft from '@/components/feed/FeedHomeHeaderLeft';
import { colors, feedNavigations, feedTabNavigations } from '@/constants';
import FeedFavoriteScreen from '@/screens/feed/FeedFavoriteScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  RouteProp,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeedStackNavigator from '../stack/FeedStackNavigator';
import FeedSearchScreen from '@/screens/feed/FeedSearchScreen';

export type FeedTabParamList = {
  [feedTabNavigations.FEED_HOME]: {
    screen: typeof feedNavigations.FEED_DETAIL;
    params: { id: number };
    initial: boolean;
  };
  [feedTabNavigations.FEED_FAVORITE]: undefined;
  [feedTabNavigations.FEED_SEARCH]: undefined;
};

const Tab = createBottomTabNavigator<FeedTabParamList>();

function TabBarIcons(route: RouteProp<FeedTabParamList>, focused: boolean) {
  let iconName = '';

  switch (route.name) {
    case feedTabNavigations.FEED_HOME:
      iconName = focused ? 'reader' : 'reader-outline';
      break;
    case feedTabNavigations.FEED_FAVORITE:
      iconName = focused ? 'star' : 'star-outline';
      break;
    case feedTabNavigations.FEED_SEARCH:
      iconName = focused ? 'search' : 'search-outline';
      break;
  }

  return (
    <Ionicons
      name={iconName}
      color={focused ? colors.BLUE_500 : colors.GREY_500}
      size={25}
    />
  );
}

function FeedTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: colors.WHITE,
          shadowColor: colors.GREY_400,
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: colors.BLACK,

        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.BLUE_500,
        tabBarStyle: {
          backgroundColor: colors.WHITE,
          borderTopColor: colors.GREY_200,
          borderTopWidth: 1,
        },
        tabBarIcon: ({ focused }) => TabBarIcons(route, focused),
      })}
    >
      <Tab.Screen
        name={feedTabNavigations.FEED_HOME}
        component={FeedStackNavigator}
        options={({ route }) => ({
          headerShown: false,
          tabBarStyle: (tabRoute => {
            const routeName =
              getFocusedRouteNameFromRoute(tabRoute) ??
              feedNavigations.FEED_HOME;

            if (
              routeName === feedNavigations.FEED_DETAIL ||
              routeName === feedNavigations.EDIT_POST ||
              routeName === feedNavigations.IMAGE_ZOOM
            ) {
              return { display: 'none' };
            }

            return {
              backgroundColor: colors.WHITE,
              borderTopColor: colors.GREY_300,
              borderTopWidth: StyleSheet.hairlineWidth,
            };
          })(route),
        })}
      />
      <Tab.Screen
        name={feedTabNavigations.FEED_FAVORITE}
        component={FeedFavoriteScreen}
        options={({ navigation }) => ({
          headerTitle: '즐겨찾기',
          headerLeft: () => FeedHomeHeaderLeft(navigation),
          headerStyle: {
            backgroundColor: colors.WHITE,
            borderColor: colors.GREY_100,
            borderWidth: 1,
            height: 110,
          },
        })}
      />
      <Tab.Screen
        name={feedTabNavigations.FEED_SEARCH}
        component={FeedSearchScreen}
        options={({ navigation }) => ({
          headerTitle: '검색',
          headerShown: false,
          headerLeft: () => FeedHomeHeaderLeft(navigation),
        })}
      />
    </Tab.Navigator>
  );
}

export default FeedTabNavigator;
