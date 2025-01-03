import { ResponsePost } from '@/api';
import { colors, feedNavigations } from '@/constants';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { deviceType } from '@/utils';
import { getDateWithSeparator } from '@/utils/date';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';

interface FeedItemProps {
  post: ResponsePost;
}

function FeedItem({ post }: FeedItemProps) {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  const navigation = useNavigation<StackNavigationProp<FeedStackParamList>>();

  const handlePressFeed = () => {
    navigation.navigate(feedNavigations.FEED_DETAIL, { id: post.id });
  };

  return (
    <Pressable style={styles.container} onPress={handlePressFeed}>
      <View>
        {post.images.length > 0 && (
          <View key={post.id} style={styles.imageContainer}>
            <FastImage
              style={styles.image}
              source={{
                uri: `${
                  deviceType === 'ios'
                    ? 'http://localhost:3030/'
                    : 'http://10.0.2.2:3030/'
                }${post.images[0]?.url}`,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        )}

        {post.images.length === 0 && (
          <View style={[styles.imageContainer, styles.emptyImageContainer]}>
            <Text>No Image</Text>
          </View>
        )}

        <View style={styles.textContainer}>
          <Text style={styles.dateText}>
            {getDateWithSeparator(post.date, '/')}
          </Text>
          <Text style={styles.titleText}>{post.title}</Text>

          {post.description && (
            <Text
              style={styles.descriptionText}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {post.description}
            </Text>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginVertical: 8,
      maxWidth: Dimensions.get('screen').width / 2 - 20,
    },
    imageContainer: {
      width: Dimensions.get('screen').width / 2 - 20,
      height: Dimensions.get('screen').width / 2 - 20,
      backgroundColor: colors[theme].GREY_200,
      borderRadius: 10,
      overflow: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    emptyImageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: colors[theme].GREY_200,
      borderWidth: 1,
      borderRadius: 10,
    },
    textContainer: {
      marginTop: 5,
      gap: 2,
    },
    dateText: {
      color: colors[theme].GREY_500,
      fontSize: 12,
      fontWeight: '600',
    },
    titleText: {
      color: colors[theme].GREY_900,
      fontSize: 16,
      fontWeight: '500',
    },
    descriptionText: {
      color: colors[theme].GREY_700,
      fontSize: 14,
      fontWeight: '400',
      marginTop: 5,
    },
  });

export default FeedItem;
