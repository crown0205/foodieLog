import { CalendarPost } from '@/api';
import {
  colors,
  feedNavigations,
  feedTabNavigations,
  mainNavigations,
} from '@/constants';
import useThemeStorage from '@/hooks/useThemeStorage';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigator';
import { FeedTabParamList } from '@/navigations/tab/FeedTabNavigator';
import { ThemeMode } from '@/types';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface EventListProps {
  posts: CalendarPost[];
}

type Navigation = CompositeNavigationProp<
  DrawerNavigationProp<MainDrawerParamList>,
  BottomTabNavigationProp<FeedTabParamList>
>;

const EventList = ({ posts }: EventListProps) => {
  const { theme } = useThemeStorage();
  const styles = styling(theme);
  const navigation = useNavigation<Navigation>();
  const insets = useSafeAreaInsets();

  const handlePressItem = (id: number) => {
    navigation.navigate(mainNavigations.FEED, {
      screen: feedTabNavigations.FEED_HOME,
      params: {
        screen: feedNavigations.FEED_DETAIL,
        params: { id },
        initial: false,
      },
    });
  };

  return (
    <ScrollView style={styles.container} scrollIndicatorInsets={{ right: 1 }}>
      <View
        style={(styles.innerContainer, { marginBottom: insets.bottom + 30 })}
      >
        {posts?.map(post => {
          return (
            <Pressable
              key={post.id}
              style={styles.itemContainer}
              onPress={() => handlePressItem(post.id)}
            >
              <View
                style={[
                  styles.itemHeader,
                  {
                    backgroundColor:
                      colors[theme][`${post.color}_100`] ??
                      colors[theme].BLUE_100,
                  },
                ]}
              />
              <View style={styles.infoContainer}>
                <Text
                  style={styles.addressText}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {post.address}
                </Text>
                <Text style={styles.titleText}>{post.title}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors[theme].WHITE,
      padding: 20,
    },
    innerContainer: {
      gap: 20,
    },
    itemContainer: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: '#E5E5E5',
    },
    itemHeader: {
      width: 6,
      height: 60,
      marginRight: 10,
      borderRadius: 20,
    },
    infoContainer: {
      justifyContent: 'space-evenly',
    },
    addressText: {
      fontSize: 14,
      color: colors[theme].GREY_500,
    },
    titleText: {
      fontSize: 16,
      color: colors[theme].BLACK,
      fontWeight: '600',
    },
  });

export default EventList;
