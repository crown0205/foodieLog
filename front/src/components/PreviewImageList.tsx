import { ImageUrl } from '@/types/domain';
import { deviceType } from '@/utils';
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native';

interface PreviewImageListProps {
  imageUrls: ImageUrl[];
}

function PreviewImageList({ imageUrls }: PreviewImageListProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {imageUrls.map(({ url }, index) => (
          <View key={url} style={styles.imageContainer}>
            <Pressable>
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
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
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
});

export default PreviewImageList;
