import Geolocation from '@react-native-community/geolocation';
import { useEffect, useState } from 'react';
import { LatLng } from 'react-native-maps';

function useUserLocation() {
  const [userLocation, setUserLocation] = useState<LatLng>({
    // 기본은 서울로 설정
    latitude: 37.5665,
    longitude: 126.978,
  });
  const [isUserLocationError, setIsUserLocationError] = useState(false);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        const { longitude, latitude } = info.coords;
        setUserLocation({ longitude, latitude });
        setIsUserLocationError(false);
      },
      error => {
        setIsUserLocationError(true);
      },
      {
        enableHighAccuracy: true, // NOTE : 높은 정확도로 위치를 가져옴
      },
    );
  }, []);

  return { userLocation, isUserLocationError };
}

export default useUserLocation;
