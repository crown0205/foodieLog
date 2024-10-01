import { ResponsePost } from '@/api';
import { colors } from '@/constants';
import { deviceType } from '@/utils';
import { getDateWithSeparator } from '@/utils/date';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface FeedItemProps {
  post: ResponsePost;
}

function FeedItem({ post }: FeedItemProps) {
  return (
    <View style={styles.container}>
      <Pressable onPress={() => {}}>
        <View>
          {post.images.length > 0 && (
            <View key={post.id} style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: `${
                    deviceType === 'ios'
                      ? 'http://localhost:3030/'
                      : 'http://10.0.2.2:3030/'
                  }${post.images[0]?.url}`,
                }}
                resizeMode="cover"
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 8,
    alignItems: 'center',
  },
  imageContainer: {
    width: Dimensions.get('screen').width / 2 - 20,
    height: Dimensions.get('screen').width / 2 - 20,
    backgroundColor: colors.GREY_200,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  emptyImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.GREY_200,
    borderWidth: 1,
    borderRadius: 10,
  },
  textContainer: {
    marginTop: 5,
    gap: 2,
  },
  dateText: {
    color: colors.GREY_500,
    fontSize: 12,
    fontWeight: '600',
  },
  titleText: {
    color: colors.GREY_900,
    fontSize: 16,
    fontWeight: '500',
  },
  descriptionText: {
    color: colors.GREY_700,
    fontSize: 14,
    fontWeight: '400',
    marginTop: 5,
  },
});

export default FeedItem;
