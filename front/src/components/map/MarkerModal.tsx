import { colors, feedNavigations, mainNavigations } from '@/constants';
import useGetPost from '@/hooks/queries/useGetPost';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigator';
import { FeedStackParamList } from '@/navigations/stack/FeedStackNavigator';
import { deviceType } from '@/utils';
import { getDateWithSeparator } from '@/utils/date';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import CustomMarker from '../common/CustomMarker';
import useThemeStorage from '@/hooks/useThemeStorage';
import { ThemeMode } from '@/types';

interface MarkerModalProps {
  markerId: number | null;
  isVisible: boolean;
  hide: () => void;
}

type Navigation = CompositeNavigationProp<
  DrawerNavigationProp<MainDrawerParamList>,
  StackNavigationProp<FeedStackParamList>
>;

function MarkerModal({ markerId, isVisible, hide }: MarkerModalProps) {
  const { theme } = useThemeStorage();
  const styles = styling(theme);
  const navigation = useNavigation<Navigation>();
  const { data: post, isPending, isError } = useGetPost(markerId);

  if (isPending || isError) {
    return <></>;
  }

  const handlePressModal = () => {
    navigation.navigate(mainNavigations.FEED, {
      screen: feedNavigations.FEED_HOME,
      params: {
        screen: feedNavigations.FEED_DETAIL,
        params: { id: post.id },
        initial: false,
      },
    });

    hide();
  };

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <SafeAreaView
        style={[
          styles.optionBackground,
          deviceType === 'android' && { marginBottom: 20 },
        ]}
        onTouchEnd={hide}
      >
        <Pressable onPress={handlePressModal}>
          <View style={styles.cardContainer}>
            <View style={styles.cardInner}>
              <View style={styles.cardAlign}>
                {post.images.length > 0 && (
                  <View style={styles.imageContainer}>
                    <Image
                      style={styles.image}
                      source={{
                        uri: `${
                          deviceType === 'ios'
                            ? 'http:localhost:3030/'
                            : 'http://10.0.2.2:3030/'
                        }${post.images[0].url}`,
                      }}
                      resizeMode="cover"
                    />
                  </View>
                )}
                {post.images.length === 0 && (
                  <View
                    style={[styles.imageContainer, styles.emptyImageContainer]}
                  >
                    <CustomMarker color={post.color} score={post.score} />
                  </View>
                )}
                <View style={styles.infoContainer}>
                  <View style={styles.addressContainer}>
                    <Octicons
                      name="location"
                      size={16}
                      color={colors[theme].BLACK}
                    />
                    <Text
                      style={styles.addressText}
                      ellipsizeMode="tail" // NOTE : 글자가 길면 ...으로 표시
                      numberOfLines={1} // NOTE : 한 줄만 표시
                    >
                      {post.address}
                    </Text>
                  </View>
                  <Text style={styles.titleText}>{post.title}</Text>
                  <Text style={styles.dateText}>
                    {getDateWithSeparator(post.date, '.')}
                  </Text>
                </View>

                <View style={styles.nextButton}>
                  <MaterialIcons
                    name="arrow-forward-ios"
                    size={20}
                    color={colors[theme].GREY_700}
                    onPress={hide}
                  />
                </View>
              </View>
            </View>
          </View>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    optionBackground: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    cardContainer: {
      width: '96%',
      alignSelf: 'center',
      justifyContent: 'center',
      backgroundColor: colors[theme].WHITE,
      borderRadius: 20,
      shadowOffset: { width: 1, height: 1 },
      shadowColor: colors[theme].BLACK,
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5,
      overflow: 'hidden',
    },
    cardInner: {
      padding: 20,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    imageContainer: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: colors[theme].GREY_100,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyImageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderColor: colors[theme].GREY_200,
      borderRadius: 35,
      borderWidth: 2,
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 35,
    },
    cardAlign: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    infoContainer: {
      width: Dimensions.get('screen').width / 2,
      gap: 5,
    },
    addressContainer: {
      gap: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    addressText: {
      color: colors[theme].GREY_600,
      fontSize: 10,
    },
    titleText: {
      color: colors[theme].BLACK,
      fontSize: 16,
      fontWeight: '600',
    },
    dateText: {
      fontSize: 12,
      fontWeight: '600',
      color: colors[theme].BLUE_500,
    },
    nextButton: {
      width: 40,
      height: 40,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      right: -10,
    },
  });

export default MarkerModal;
