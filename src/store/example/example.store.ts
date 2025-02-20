import { create } from 'zustand'

interface StoreExampleInterface {
  count: number;
  inc: () => void;
}

const useStore = create<StoreExampleInterface>((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
}))

export { useStore }
