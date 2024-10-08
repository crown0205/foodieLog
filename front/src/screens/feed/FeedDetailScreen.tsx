import CustomButton from '@/components/common/CustomButton';
import PreviewImageList from '@/components/common/PreviewImageList';
import {
  MapNavigations,
  colorHex,
  colors,
  feedNavigations,
  mainNavigations,
} from '@/constants';
import useGetPost from '@/hooks/queries/useGetPost';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigator';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';
import useLocationStore from '@/store/useLocationStore';
import { deviceType, getDateLocaleFormat } from '@/utils';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';

type FeedDetailScreenProps = CompositeScreenProps<
  StackScreenProps<FeedStackParamList, typeof feedNavigations.FEED_DETAIL>,
  DrawerScreenProps<MainDrawerParamList>
>;

// TODO : preview 이미지 클릭시 메인 사진 변경

function FeedDetailScreen({ route, navigation }: FeedDetailScreenProps) {
  const { id } = route.params;
  const { data: post, isPending, isError } = useGetPost(id);
  const insets = useSafeAreaInsets(); // NOTE : 상단바 높이
  const { setMoveLocation } = useLocationStore();

  if (isPending || isError) {
    return <></>;
  }

  const handlePressLocation = () => {
    const { latitude, longitude } = post;

    setMoveLocation({ latitude, longitude });
    navigation.navigate(mainNavigations.HOME, {
      screen: MapNavigations.MAP_HOME,
    });
  };

  return (
    <>
      <ScrollView style={styles.container} scrollIndicatorInsets={{ right: 1 }}>
        <SafeAreaView style={styles.header}>
          <View
            style={[
              styles.headerButtonContainer,
              insets.top === 0 && { paddingVertical: 20 },
            ]}
          >
            <Octicons
              name="arrow-left"
              size={30}
              color={colors.WHITE}
              style={styles.topButton}
              onPress={() => navigation.goBack()}
            />

            <View style={styles.headerTopBarContainer}>
              <Octicons
                name="star-fill"
                size={28}
                color={colors.WHITE}
                style={styles.topButton}
                onPress={() => {}}
              />
              <Ionicons
                name="ellipsis-vertical"
                size={30}
                color={colors.WHITE}
                style={styles.topButton}
                onPress={() => {}}
              />
            </View>
          </View>
        </SafeAreaView>

        <View style={styles.imageContainer}>
          {post.images.length > 0 && (
            <Image
              style={styles.image}
              source={{
                uri: `${
                  deviceType === 'ios'
                    ? 'http://localhost:3030/'
                    : 'http://10.0.2.2:3030/'
                }${post.images[0].url}`,
              }}
              resizeMode="cover"
            />
          )}
          {post.images.length === 0 && (
            <View style={styles.emptyImageContainer}>
              <Text>No Image</Text>
            </View>
          )}
        </View>

        <View style={styles.contentsContainer}>
          <View style={styles.addressContainer}>
            <Octicons name="location" size={10} color={colors.GREY_500} />
            <Text
              style={styles.addressText}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {post.address}
            </Text>
          </View>
          <Text style={styles.titleText}>{post.title}</Text>
          <View style={styles.infoContainer}>
            <View style={styles.infoRow}>
              <View style={styles.infoColumn}>
                <Text style={styles.infoColumnKeyText}>방문날짜 :</Text>
                <Text style={styles.infoColumnValueText}>
                  {getDateLocaleFormat(post.date)}
                </Text>
              </View>
              <View style={styles.infoColumn}>
                <Text style={styles.infoColumnKeyText}>평점 :</Text>
                <Text style={styles.infoColumnValueText}>{post.score}점</Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoColumn}>
                <Text style={styles.infoColumnKeyText}>마커색상</Text>
                <View
                  style={[
                    styles.markerColor,
                    { backgroundColor: colorHex[post.color] },
                  ]}
                />
              </View>
              <View style={styles.infoColumn}>
                <Text style={styles.infoColumnKeyText}>카테고리 :</Text>
                <Text style={styles.infoColumnValueText}>TEST</Text>
              </View>
            </View>
          </View>
          <Text style={styles.descriptionText}>{post.description}</Text>
        </View>

        {post.images.length > 0 && (
          <View style={styles.imagePreviewContainer}>
            <PreviewImageList imageUrls={post.images} />
          </View>
        )}
      </ScrollView>

      <View style={[styles.bottomContainer]}>
        <Pressable style={({ pressed }) => [pressed && [{ opacity: 0.5 }]]}>
          <CustomButton
            label="위치보기"
            size="full"
            variant="filled"
            onPress={handlePressLocation}
          />
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  header: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
    top: 0,
  },
  headerButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  topButton: {
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5, // NOTE : 안드로이드에서는 적용되지 않음
    elevation: 10, // NOTE : 안드로이드
  },
  headerTopBarContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  bookmarkContainer: {
    padding: 8,
    borderRadius: 20,
  },
  bookmarkPressedContainer: {
    backgroundColor: colors.GREY_300,
  },
  imageContainer: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').width,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  emptyImageContainer: {
    height: Dimensions.get('screen').width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.GREY_200,
    borderColor: colors.GREY_300,
    borderWidth: 1,
  },
  contentsContainer: {
    padding: 16,
    backgroundColor: colors.WHITE,
    marginBottom: 10,
  },
  addressContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  addressText: {
    color: colors.GREY_500,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.BLACK,
    marginTop: 10,
  },
  infoContainer: {
    marginVertical: 20,
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 8,
  },
  infoColumn: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  infoColumnKeyText: {
    color: colors.GREY_600,
  },
  infoColumnValueText: {
    color: colors.BLACK,
    fontWeight: '600',
  },
  markerColor: {
    width: 16,
    height: 16,
    borderRadius: 20,
  },
  descriptionText: {
    color: colors.GREY_500,
    fontSize: 16,
  },
  imagePreviewContainer: {
    padding: 16,
    backgroundColor: colors.WHITE,
    marginBottom: 10,
  },
  bottomContainer: {
    backgroundColor: colors.RED_100,
    height: 60,
  },
});

export default FeedDetailScreen;
