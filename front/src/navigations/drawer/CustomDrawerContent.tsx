import { colors, mainNavigations, settingNavigations } from '@/constants';
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { getProfileQuery } = useAuth();
  const { email, nickname, imageUrl, kakaoImageUrl } =
    getProfileQuery.data || {};

  const handlePressSetting = () => {
    props.navigation.navigate(mainNavigations.SETTING, {
      screen: settingNavigations.SETTING_HOME,
    });
  };

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
        ]}
      >
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

      <View style={styles.bottomContainer}>
        <Pressable style={styles.bottomMenu} onPress={handlePressSetting}>
          <MaterialIcons name="settings" size={18} color={colors.GREY_700} />
          <Text style={styles.bottomMenuText}>설정</Text>
        </Pressable>
      </View>
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
  bottomContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    gap: 20,
    borderTopColor: colors.GREY_200,
  },
  bottomMenu: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  bottomMenuText: {
    color: colors.BLACK,
    fontSize: 16,
  },
});

export default CustomDrawerContent;
