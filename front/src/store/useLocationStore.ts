import { LatLng } from 'react-native-maps';
import { create } from 'zustand';

interface LocationStore {
  moveLocation: LatLng | null;
  selectLocation: LatLng | null;
  setMoveLocation: (location: LatLng | null) => void;
  setSelectLocation: (location: LatLng | null) => void;
}

const useLocationStore = create<LocationStore>(set => ({
  moveLocation: null,
  selectLocation: null,
  setMoveLocation: (moveLocation: LatLng | null) => {
    set(state => ({ ...state, moveLocation }));
  },
  setSelectLocation: (selectLocation: LatLng | null) => {
    set(state => ({ ...state, selectLocation }));
  },
}));

export default useLocationStore;
