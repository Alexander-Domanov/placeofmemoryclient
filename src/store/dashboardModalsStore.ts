import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface DashboardModalsStore {
  fileInfoModal: {
    isOpen: boolean;
    uploadId: string | null;
    setIsOpen: (open: boolean) => void;
    setUploadId: (id: string | null) => void;
  };
}

export const useDashboardModalsStore = create<DashboardModalsStore>()(
  immer((set) => ({
    fileInfoModal: {
      isOpen: false,
      uploadId: null,

      setIsOpen: (open) => {
        set((state) => {
          state.fileInfoModal.isOpen = open;
        });
      },

      setUploadId: (id) => {
        set((state) => {
          state.fileInfoModal.uploadId = id;
        });
      },
    },
  }))
);
