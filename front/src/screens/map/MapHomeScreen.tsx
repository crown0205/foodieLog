import { colors } from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import usePermission from '@/hooks/usePermission';
import useUserLocation from '@/hooks/useUserLocation';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigator';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

const MapHomeScreen = () => {
  const { logoutMutation } = useAuth();
  const inset = useSafeAreaInsets(); // NOTE : 상단의 상태바 높이를 가져옴
  const navigation = useNavigation<Navigation>();
  const { userLocation, isUserLocationError } = useUserLocation();
  const mapRef = React.useRef<MapView | null>(null);
  usePermission('LOCATION');

  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      // NOTE : 유저의 위치를 가져오는데 실패했을 때
    }

    mapRef.current?.animateToRegion({
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        showsUserLocation // NOTE : 유저의 위치를 보여줌
        followsUserLocation // NOTE : 위치가 변경되면 따라가게
        showsMyLocationButton={false} // NOTE : 내 위치 버튼
      />
      <Pressable
        style={[styles.drawerButton, { top: inset.top || 20 }]}
        onPress={() => navigation.openDrawer()}>
        <Text>서랍</Text>
      </Pressable>
      <View style={styles.buttonList}>
        <Pressable style={styles.mapButton} onPress={handlePressUserLocation}>
          <Text>내위치</Text>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerButton: {
    position: 'absolute',
    left: 0,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.WHITE,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5, // NOTE : 안드로이드에서는 적용되지 않음
    elevation: 5, // NOTE : 안드로이드에서만 그림자 표현
  },
  buttonList: {
    position: 'absolute',
    bottom: 30,
    right: 15,
  },
  mapButton: {
    backgroundColor: colors.WHITE,
    marginVertical: 5,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    shadowColor: colors.BLACK,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.5, // NOTE : 안드로이드에서는 적용되지 않음
    elevation: 2, // NOTE : 안드로이드
  },
});

export default MapHomeScreen;
