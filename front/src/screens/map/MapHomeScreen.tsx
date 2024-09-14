import useAuth from '@/hooks/queries/useAuth';
import React from 'react';
import {StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const MapHomeScreen = () => {
  const {logoutMutation} = useAuth();

  return (
    <>
      <MapView
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        showsUserLocation // NOTE : 유저의 위치를 보여줌
        followsUserLocation // NOTE : 위치가 변경되면 따라가게
        showsMyLocationButton={false} // NOTE : 내 위치 버튼
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MapHomeScreen;
