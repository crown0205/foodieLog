import { colors } from '@/constants';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { ImageUrl } from '@/types/domain';
import { deviceType } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Octicons from 'react-native-vector-icons/Octicons';

interface ImageCarouselProps {
  images: ImageUrl[];
  pressedIndex?: number;
}

const deviceWidth = Dimensions.get('window').width;

const ImageCarousel = ({ images, pressedIndex = 0 }: ImageCarouselProps) => {
  const { theme } = useThemeStore();
  const styles = styling(theme);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [currentPage, setPage] = useState(pressedIndex);
  const [initialIndex, setInitialIndex] = useState(pressedIndex);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newPage = Math.round(e.nativeEvent.contentOffset.x / deviceWidth);

    setPage(newPage);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.BackButton, { marginTop: insets.top + 10 }]}
        onPress={() => navigation.goBack()}
      >
        <Octicons name="arrow-left" size={30} color={colors[theme].BLACK} />
      </Pressable>

      <FlatList
        data={images}
        renderItem={({ item }) => {
          return (
            <View style={styles.imageContainer}>
              <FastImage
                style={styles.image}
                source={{
                  uri: `${
                    deviceType === 'ios'
                      ? 'http://localhost:3030/'
                      : 'http://10.0.2.2:3030/'
                  }${item.url}`,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          );
        }}
        keyExtractor={item => String(item.id)}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={initialIndex}
        onScroll={handleScroll}
        onScrollToIndexFailed={() => {
          setInitialIndex(0);
        }}
        getItemLayout={(_, index) => ({
          length: deviceWidth,
          offset: deviceWidth * index,
          index,
        })}
      />

      <View style={[styles.pageContainer, { bottom: insets.bottom + 10 }]}>
        {Array.from({ length: images.length }, (_, index) => (
          <View
            key={index}
            style={[
              styles.pageDot,
              index === currentPage && styles.currentPageDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: colors[theme].WHITE,
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
    pageContainer: {
      position: 'absolute',
      flexDirection: 'row',
      alignItems: 'center',
    },
    pageDot: {
      width: 8,
      height: 8,
      backgroundColor: colors[theme].GREY_300,
      margin: 4,
      borderRadius: 4,
    },
    currentPageDot: {
      backgroundColor: colors[theme].BLACK,
    },
  });

export default ImageCarousel;
