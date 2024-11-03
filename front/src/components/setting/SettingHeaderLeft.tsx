import { colors } from '@/constants';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigator';
import { SettingStackParamList } from '@/navigations/stack/SettingStackNavigator';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HeaderButton from '../common/HeaderButton';
import useThemeStorage from '@/hooks/useThemeStorage';

type SettingHeaderLeftProps = CompositeNavigationProp<
  StackNavigationProp<SettingStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

function SettingHeaderLeft(navigation: SettingHeaderLeftProps) {
  const { theme } = useThemeStorage();
  return (
    <HeaderButton
      icon={<Ionicons name="menu" color={colors[theme].BLACK} size={25} />}
      onPress={() => navigation.openDrawer()}
    />
  );
}

export default SettingHeaderLeft;
