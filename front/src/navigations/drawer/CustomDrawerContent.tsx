import { BASE_URL } from '@/api/axios';
import { colors, mainNavigations, settingNavigations } from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import useThemeStore from '@/store/useThemeStore';
import { ThemeMode } from '@/types';
import { deviceType } from '@/utils';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { theme } = useThemeStore();
  const styles = styling(theme);
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
                <FastImage
                  source={require('@/assets/user-default.png')}
                  style={styles.userImage}
                />
              )}
            {imageUrl === null && !!kakaoImageUrl && (
              <FastImage
                source={{ uri: `${kakaoImageUrl}` }}
                style={styles.userImage}
              />
            )}
            {imageUrl !== null && (
              <FastImage
                source={{
                  uri: `${BASE_URL}${imageUrl}`,
                }}
                style={styles.userImage}
              />
            )}
          </Pressable>

          <Text style={styles.nameText}>{nickname ?? email}</Text>
        </View>

        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      <View style={styles.bottomContainer}>
        <Pressable style={styles.bottomMenu} onPress={handlePressSetting}>
          <MaterialIcons
            name="settings"
            size={18}
            color={colors[theme].GREY_700}
          />
          <Text style={styles.bottomMenuText}>설정</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].WHITE,
    },
    contentContainer: {
      backgroundColor: colors[theme].WHITE,
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
      color: colors[theme].BLACK,
    },
    bottomContainer: {
      flexDirection: 'row',
      borderTopWidth: 1,
      paddingVertical: 15,
      paddingHorizontal: 20,
      gap: 20,
      borderTopColor: colors[theme].GREY_200,
    },
    bottomMenu: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    bottomMenuText: {
      color: colors[theme].BLACK,
      fontSize: 16,
    },
  });

export default CustomDrawerContent;
