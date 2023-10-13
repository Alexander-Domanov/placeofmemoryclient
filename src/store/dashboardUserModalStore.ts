import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface DashboardUserModalsStore {
  userInfoModal: {
    isOpen: boolean;
    userId: number | null;
    setIsOpen: (open: boolean) => void;
    setUserId: (userId: number | null) => void;
  };
}

export const useDashboardUserModalsStore = create<DashboardUserModalsStore>()(
  immer((set) => ({
    userInfoModal: {
      isOpen: false,
      userId: null,

      setIsOpen: (open) => {
        set((state) => {
          state.userInfoModal.isOpen = open;
        });
      },

      setUserId: (userId) => {
        set((state) => {
          state.userInfoModal.userId = userId;
        });
      },
    },
  }))
);
