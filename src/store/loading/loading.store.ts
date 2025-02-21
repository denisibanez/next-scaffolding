import { create } from 'zustand';

interface StoreLoadingInterface {
  loading: boolean;
  setLoading: (payload: boolean) => void;
}

const useLoadingStore = create<StoreLoadingInterface>((set) => ({
  loading: false,
  setLoading: (payload: boolean) => {
    set({ loading: payload });
  },
}));

export { useLoadingStore };
