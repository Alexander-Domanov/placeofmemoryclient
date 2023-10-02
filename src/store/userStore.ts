import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UserStore {
  userId: number | null;
  userName: string | null;
  setUserId: (userId: number | null) => void;
  setUserName: (userName: string | null) => void;
}

export const useUserStore = create<UserStore>()(
  devtools((set) => ({
    userId: null,
    userName: null,
    setUserId(userId) {
      set({ userId });
    },
    setUserName(userName) {
      set({ userName });
    },
  }))
);
