import type { LatLng } from 'react-native-maps';
import { create } from 'zustand';

interface LocationStore {
  moveLocation: LatLng | null;
  setMoveLocation: (location: LatLng) => void;
}

const useLocationStore = create<LocationStore>(set => ({
  moveLocation: null,
  setMoveLocation: (moveLocation: LatLng) => {
    set(state => ({ ...state, moveLocation }));
  },
}));

export default useLocationStore;
