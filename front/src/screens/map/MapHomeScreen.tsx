import CustomMarker from '@/components/common/CustomMarker';
import MarkerModal from '@/components/map/MarkerModal';
import { MapNavigations, alerts, colors, numbers } from '@/constants';
import useGetMarkers from '@/hooks/queries/useGetMarkers';
import useModal from '@/hooks/useModal';
import useMoveMapView from '@/hooks/useMoveMapView';
import usePermission from '@/hooks/usePermission';
import useUserLocation from '@/hooks/useUserLocation';
import { MainDrawerParamList } from '@/navigations/drawer/MainDrawerNavigator';
import { MapStackParamList } from '@/navigations/stack/MapStackNavigator';
import mapStyle from '@/style/mapStyle';

import { DrawerNavigationProp } from '@react-navigation/drawer';
import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Alert, Pressable, StyleSheet, View } from 'react-native';
import MapView, {
  LatLng,
  LongPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Navigation = CompositeNavigationProp<
  StackNavigationProp<MapStackParamList>,
  DrawerNavigationProp<MainDrawerParamList>
>;

const MapHomeScreen = () => {
  const inset = useSafeAreaInsets(); // NOTE : 상단의 상태바 높이를 가져옴
  const navigation = useNavigation<Navigation>();

  const { userLocation, isUserLocationError } = useUserLocation();
  const markerModal = useModal();
  const [selectLocation, setSelectLocation] = useState<LatLng | null>();
  const [markerId, setMarkerId] = useState<number | null>(null);
  const { data: markers = [] } = useGetMarkers();
  const { mapRef, moveMapView, handleChangeDelta } = useMoveMapView();
  usePermission('LOCATION');

  const handlePressMarker = (id: number, coordinate: LatLng) => {
    setMarkerId(id);
    markerModal.show();
    moveMapView(coordinate);
  };

  const handleLongPressMapView = ({ nativeEvent }: LongPressEvent) => {
    setSelectLocation(nativeEvent.coordinate);
  };

  const handlePressAddPost = () => {
    if (!selectLocation) {
      return Alert.alert(
        alerts.NOT_SELECTED_LOCATION.TITLE,
        alerts.NOT_SELECTED_LOCATION.DESCRIPTION,
      );
    }

    navigation.navigate(MapNavigations.ADD_POST, {
      location: selectLocation,
    });
    setSelectLocation(null);
  };

  const handlePressUserLocation = () => {
    if (isUserLocationError) {
      // NOTE : 유저의 위치를 가져오는데 실패했을 때
    }

    moveMapView(userLocation);
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
        customMapStyle={mapStyle}
        onLongPress={handleLongPressMapView}
        onRegionChangeComplete={handleChangeDelta}
        region={{
          ...userLocation,
          ...numbers.INITIAL_DELTA,
        }}
      >
        {markers.map(({ id, color, score, ...coordinate }) => (
          <CustomMarker
            key={id}
            color={color}
            score={score}
            coordinate={coordinate}
            onPress={() => handlePressMarker(id, coordinate)}
          />
        ))}
        {selectLocation && <Marker coordinate={selectLocation} />}
      </MapView>
      <Pressable
        style={[styles.drawerButton, { top: inset.top || 20 }]}
        onPress={() => navigation.openDrawer()}
      >
        <Ionicons name="menu" color={colors.BLACK} size={25} />
      </Pressable>
      <View style={styles.buttonList}>
        <Pressable style={styles.mapButton} onPress={handlePressAddPost}>
          <MaterialIcons name="add" color={colors.BLACK} size={25} />
        </Pressable>
        <Pressable style={styles.mapButton} onPress={handlePressUserLocation}>
          <MaterialIcons name="my-location" color={colors.BLACK} size={25} />
        </Pressable>
      </View>

      <MarkerModal
        markerId={markerId}
        isVisible={markerModal.isVisible}
        hide={markerModal.hide}
      />
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
