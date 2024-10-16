import { colors } from '@/constants';
import { ImageUrl } from '@/types/domain';
import { deviceType } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Octicons from 'react-native-vector-icons/Octicons';

interface ImageCarouselProps {
  images: ImageUrl[];
  pressedIndex?: number;
}

const deviceWidth = Dimensions.get('window').width;

const ImageCarousel = ({ images, pressedIndex = 0 }: ImageCarouselProps) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [initialIndex, setInitialIndex] = React.useState(pressedIndex);

  console.log({ deviceWidth });
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.BackButton, { marginTop: insets.top + 10 }]}
        onPress={() => navigation.goBack()}
      >
        <Octicons name="arrow-left" size={30} color={colors.BLACK} />
      </Pressable>

      <FlatList
        data={images}
        keyExtractor={item => String(item.id)}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={pressedIndex}
        onScrollToIndexFailed={() => {
          setInitialIndex(0);
        }}
        getItemLayout={(_, index) => ({
          length: deviceWidth,
          offset: deviceWidth * index,
          index,
        })}
        renderItem={({ item }) => {
          return (
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: `${
                    deviceType === 'ios'
                      ? 'http://localhost:3030/'
                      : 'http://10.0.2.2:3030/'
                  }${item.url}`,
                }}
                resizeMode="contain"
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  BackButton: {
    position: 'absolute',
    left: 10,
    zIndex: 1,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: deviceWidth,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImageCarousel;
