import FeedHomeHeaderLeft from '@/components/feed/FeedHomeHeaderLeft';
import { colors } from '@/constants';
import { feedNavigations } from '@/constants/navigations';
import EditPostScreen from '@/screens/feed/EditPostScreen';
import FeedDetailScreen from '@/screens/feed/FeedDetailScreen';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import ImagesZoomScreen from '@/screens/feed/ImagesZoomScreen';
import useThemeStore from '@/store/useThemeStore';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { LatLng } from 'react-native-maps';

export type FeedStackParamList = {
  [feedNavigations.FEED_HOME]: undefined;
  [feedNavigations.FEED_DETAIL]: { id: number };
  [feedNavigations.EDIT_POST]: { location: LatLng };
  [feedNavigations.IMAGE_ZOOM]: { index: number };
};

const Stack = createStackNavigator<FeedStackParamList>();

const FeedStackNavigator = () => {
  const { theme } = useThemeStore();

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: colors[theme].WHITE },
        headerStyle: {
          backgroundColor: colors[theme].WHITE,
          shadowColor: colors[theme].GREY_400,
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: colors[theme].BLACK,
      }}
    >
      <Stack.Screen
        name={feedNavigations.FEED_HOME}
        component={FeedHomeScreen}
        options={({ navigation }) => ({
          headerTitle: '피드',
          headerLeft: () => FeedHomeHeaderLeft(navigation),
          headerStyle: {
            backgroundColor: colors[theme].WHITE,
          },
          cardStyle: {
            backgroundColor: colors[theme].WHITE,
          },
        })}
      />
      <Stack.Screen
        name={feedNavigations.FEED_DETAIL}
        component={FeedDetailScreen}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: colors[theme].WHITE,
          },
        }}
      />
      <Stack.Screen
        name={feedNavigations.EDIT_POST}
        component={EditPostScreen}
        options={{
          headerTitle: '장소 수정',
          headerLeftLabelVisible: false,
        }}
      />
      <Stack.Screen
        name={feedNavigations.IMAGE_ZOOM}
        component={ImagesZoomScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default FeedStackNavigator;
