import { numbers } from '@/constants/number';
import useLocationStore from '@/store/useLocationStore';
import { useEffect, useRef, useState } from 'react';
import MapView, { LatLng, Region } from 'react-native-maps';

type Delta = Pick<Region, 'latitudeDelta' | 'longitudeDelta'>;

function useMoveMapView() {
  const mapRef = useRef<MapView | null>(null);
  const [regionDelta, setRegionDelta] = useState<Delta>(numbers.INITIAL_DELTA);
  const { moveLocation } = useLocationStore();

  const moveMapView = (coordinate: LatLng, delta?: Delta) => {
    mapRef.current?.animateToRegion(
      {
        ...coordinate,
        ...(delta ?? regionDelta),
      },
      300,
    );
  };

  const handleChangeDelta = (region: Region) => {
    const { latitudeDelta, longitudeDelta } = region;
    console.log({ latitudeDelta, longitudeDelta });
    setRegionDelta({ latitudeDelta, longitudeDelta });
  };

  useEffect(() => {
    moveLocation && moveMapView(moveLocation);
  }, [moveLocation]);

  return { mapRef, moveMapView, handleChangeDelta };
}

export default useMoveMapView;
