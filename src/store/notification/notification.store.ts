import { create } from 'zustand';

import { NotificationType } from '@/types/notification';

interface StoreNotificationInterface {
  notificationState: {
    model: boolean;
    message: string;
    type: NotificationType;
    description?: string | null | undefined;
  };
  setNotification: (payload: {
    model: boolean;
    message: string;
    type: NotificationType;
    description?: string | null | undefined;
  }) => void;
}

const useNotificationStore = create<StoreNotificationInterface>((set) => ({
  notificationState: {
    model: false,
    message: '',
    type: 'info',
    description: '',
  },
  setNotification: (payload: {
    model: boolean;
    message: string;
    type: NotificationType;
    description?: string | null | undefined;
  }) => set({ notificationState: payload }),
}));

export { useNotificationStore };
