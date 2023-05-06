import { create } from "zustand";

type CreateHomeStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useCreateHomeModal = create<CreateHomeStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCreateHomeModal;
