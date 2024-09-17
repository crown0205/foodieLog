import { colors } from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import { deviceType } from '@/utils';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { getProfileQuery } = useAuth();
  const { email, nickname, imageUrl, kakaoImageUrl } =
    getProfileQuery.data || {};

  return (
    <SafeAreaView style={styles.container}>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={[
          styles.contentContainer,
          {
            marginTop:
              deviceType === 'android'
                ? Dimensions.get('screen').height * 0.1
                : 0,
          },
        ]}>
        <View style={styles.userInfoContainer}>
          <Pressable style={styles.userImageContainer}>
            {imageUrl === null &&
              (kakaoImageUrl === undefined || kakaoImageUrl === null) && (
                <Image
                  source={require('@/assets/user-default.png')}
                  style={styles.userImage}
                />
              )}
            {imageUrl === null && !!kakaoImageUrl && (
              <Image source={{ uri: kakaoImageUrl }} style={styles.userImage} />
            )}
            {imageUrl !== null && (
              <Image source={{ uri: imageUrl }} style={styles.userImage} />
            )}
          </Pressable>

          <Text style={styles.nameText}>{nickname ?? email}</Text>
        </View>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: colors.WHITE,
  },
  userInfoContainer: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 30,
    marginHorizontal: 15,
  },
  userImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
  },
  userImage: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
  nameText: {
    color: colors.BLACK,
  },
});

export default CustomDrawerContent;
