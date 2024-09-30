import { colors } from '@/constants';
import useGetPost from '@/hooks/queries/useGetPost';
import { deviceType } from '@/utils';
import { getDateWithSeparator } from '@/utils/date';
import {
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import CustomMarker from './CustomMarker';

interface MarkerModalProps {
  markerId: number | null;
  isVisible: boolean;
  hide: () => void;
}

function MarkerModal({ markerId, isVisible, hide }: MarkerModalProps) {
  const { data: post, isPending, isError } = useGetPost(markerId);

  if (isPending || isError) {
    return <></>;
  }

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <SafeAreaView style={[styles.optionBackground]} onTouchEnd={hide}>
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
                  <Octicons name="location" size={16} color={colors.BLACK} />
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
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  optionBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardContainer: {
    width: '96%',
    alignSelf: 'center',
    backgroundColor: colors.WHITE,
    borderRadius: 20,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: colors.BLACK,
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
    backgroundColor: colors.GREY_100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.GREY_200,
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
    justifyContent: 'space-around',
    gap: 10,
  },
  infoContainer: {
    width: Dimensions.get('screen').width / 1.7,
    gap: 5,
  },
  addressContainer: {
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    color: colors.GREY_600,
    fontSize: 10,
  },
  titleText: {
    color: colors.BLACK,
    fontSize: 16,
    fontWeight: '600',
  },
  dateText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.BLUE_500,
  },
});

export default MarkerModal;
