import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface UserStore {
  userId: number | null;
  userName: string | null;
  urlAvatar: string | null;
  setUrlAvatar: (urlAvatar: string | null) => void;
  setUserId: (userId: number | null) => void;
  setUserName: (userName: string | null) => void;
}

export const useUserStore = create<UserStore>()(
  devtools((set) => ({
    userId: null,
    userName: null,
    urlAvatar: null,
    setUrlAvatar(urlAvatar) {
      set({ urlAvatar });
    },
    setUserId(userId) {
      set({ userId });
    },
    setUserName(userName) {
      set({ userName });
    },
  }))
);
