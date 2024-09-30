import { colors } from '@/constants';
import { ImageUrl } from '@/types/domain';
import { deviceType } from '@/utils';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface PreviewImageListProps {
  imageUrls: ImageUrl[];
  onDelete: (url: string) => void;
  onChangeOrder: (startIndex: number, endIndex: number) => void;
}

function PreviewImageList({
  imageUrls,
  onDelete,
  onChangeOrder,
}: PreviewImageListProps) {
  const [isChangeOrder, setChangeOrder] = useState(false);
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={true}>
      <View style={styles.container}>
        {imageUrls.map(({ url }, index) => (
          <View key={url} style={styles.imageContainer}>
            <Pressable onPress={() => setChangeOrder(!isChangeOrder)}>
              <Image
                key={index}
                style={styles.image}
                source={{
                  uri: `${
                    deviceType === 'ios'
                      ? 'http:localhost:3030/'
                      : 'http://10.0.2.2:3030/'
                  }${url}`,
                }}
                resizeMode="cover"
              />
            </Pressable>
            {!isChangeOrder && (
              <Pressable
                style={[styles.imageButton, styles.deleteButton]}
                onPress={() => onDelete(url)}
              >
                <Ionicons name="close" size={16} color={colors.BLACK} />
              </Pressable>
            )}

            {isChangeOrder && index > 0 && (
              <Pressable
                style={[styles.imageButton, styles.moveLeftButton]}
                onPress={() => onChangeOrder(index, index - 1)}
              >
                <Ionicons
                  name={'arrow-back-outline'}
                  size={16}
                  color={colors.BLACK}
                />
              </Pressable>
            )}

            {isChangeOrder && index < imageUrls.length - 1 && (
              <Pressable
                style={[styles.imageButton, styles.moveRightButton]}
                onPress={() => onChangeOrder(index, index + 1)}
              >
                <Ionicons
                  name={'arrow-forward-outline'}
                  size={16}
                  color={colors.BLACK}
                />
              </Pressable>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
  },
  imageContainer: {
    width: 80,
    height: 80,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  imageButton: {
    position: 'absolute',
    borderRadius: 10,
    zIndex: 1,
    backgroundColor: colors.WHITE,
  },
  deleteButton: {
    top: 5,
    right: 5,
    width: 20,
    height: 20,
    shadowColor: colors.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // NOTE : Android only
    justifyContent: 'center',
    alignItems: 'center',
  },
  moveLeftButton: {
    left: 5,
    bottom: 5,
  },
  moveRightButton: {
    right: 5,
    bottom: 5,
  },
});

export default PreviewImageList;
