import { create } from 'zustand';
type GlobalCommandState = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
};
const useGlobalCommand = create<GlobalCommandState>((set) => ({
  isOpen: false,
  setOpen: (open: boolean) => set({ isOpen: open }),
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useGlobalCommand;
