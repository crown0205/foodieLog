import MapLegendOption from '@/components/map/MapLegendOption';
import DarkModeOption from '@/components/setting/DarkModeOption';
import SettingItem from '@/components/setting/SettingItem';
import { colors, settingNavigations } from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import useModal from '@/hooks/useModal';
import useThemeStorage from '@/hooks/useThemeStorage';
import { SettingStackParamList } from '@/navigations/stack/SettingStackNavigator';
import { ThemeMode } from '@/types';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

type SettingHomeScreenProps = StackScreenProps<
  SettingStackParamList,
  typeof settingNavigations.SETTING_HOME
>;

const SettingHomeScreen = ({ navigation }: SettingHomeScreenProps) => {
  const { theme } = useThemeStorage();
  const styles = styling(theme);
  const { logoutMutation } = useAuth();
  const darkModeOption = useModal();
  const mapLegendOption = useModal();

  const handlePressEditProfile = () => {
    navigation.navigate(settingNavigations.EDIT_PROFILE);
  };

  const handlePressEditCategory = () => {
    navigation.navigate(settingNavigations.EDIT_CATEGORY);
  };

  const handlePressLogout = () => {
    logoutMutation.mutate(null);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.space} />
        <SettingItem title="프로필 수정" onPress={handlePressEditProfile} />
        <SettingItem
          title="마커 카테고리 설정"
          onPress={handlePressEditCategory}
        />
        <SettingItem title="범례 표시" onPress={mapLegendOption.show} />
        <SettingItem title="다크 모드" onPress={darkModeOption.show} />

        <View style={styles.space} />
        <SettingItem
          title="로그아웃"
          onPress={handlePressLogout}
          color={colors[theme].RED_500}
          icon={
            <Octicons name="sign-out" color={colors[theme].RED_500} size={16} />
          }
        />

        <MapLegendOption
          isVisible={mapLegendOption.isVisible}
          hideOption={mapLegendOption.hide}
        />
        <DarkModeOption
          isVisible={darkModeOption.isVisible}
          hideOption={darkModeOption.hide}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors[theme].WHITE,
    },
    space: {
      height: 30,
    },
  });

export default SettingHomeScreen;
