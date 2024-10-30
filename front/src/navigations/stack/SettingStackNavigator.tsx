import EditCategoryScreen from '@/components/setting/EditCategoryScreen';
import SettingHeaderLeft from '@/components/setting/SettingHeaderLeft';
import { colors, settingNavigations } from '@/constants';
import DeleteAccountScreen from '@/screens/setting/DeleteAccountScreen';
import EditProfileScreen from '@/screens/setting/EditProfileScreen';
import SettingHomeScreen from '@/screens/setting/SettingHomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

export type SettingStackParamList = {
  [settingNavigations.SETTING_HOME]: undefined;
  [settingNavigations.EDIT_PROFILE]: undefined;
  [settingNavigations.EDIT_CATEGORY]: undefined;
  [settingNavigations.DELETE_ACCOUNT]: undefined;
};

const Stack = createStackNavigator<SettingStackParamList>();

const SettingStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: colors.GREY_100 },
        headerStyle: {
          backgroundColor: 'white',
          shadowColor: 'gray',
        },
        headerTitleStyle: {
          fontSize: 15,
        },
        headerTintColor: 'black',
      }}
    >
      <Stack.Screen
        name={settingNavigations.SETTING_HOME}
        component={SettingHomeScreen}
        options={({ navigation }) => ({
          headerTitle: '설정',
          headerLeft: () => SettingHeaderLeft(navigation),
        })}
      />
      <Stack.Screen
        name={settingNavigations.EDIT_PROFILE}
        component={EditProfileScreen}
        options={{
          headerTitle: '프로필 수정',
          cardStyle: {
            backgroundColor: colors.WHITE,
          },
        }}
      />
      <Stack.Screen
        name={settingNavigations.EDIT_CATEGORY}
        component={EditCategoryScreen}
        options={{
          headerTitle: '카테고리 설정',
          cardStyle: {
            backgroundColor: colors.WHITE,
          },
        }}
      />
      <Stack.Screen
        name={settingNavigations.DELETE_ACCOUNT}
        component={DeleteAccountScreen}
        options={{
          headerTitle: '회원탈퇴',
          cardStyle: {
            backgroundColor: colors.WHITE,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingStackNavigator;
