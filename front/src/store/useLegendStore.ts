import { create } from 'zustand';

interface LegendStore {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

const useLegendStore = create<LegendStore>(set => ({
  isVisible: false,
  setIsVisible: (isVisible: boolean) => set({ isVisible }),
}));

export default useLegendStore;
