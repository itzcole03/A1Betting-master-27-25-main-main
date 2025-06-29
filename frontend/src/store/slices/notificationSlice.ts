import { StateCreator } from 'zustand';
import { ToastNotification } from '../../utils/formatters';
import { AppStore } from '../useAppStore';

export interface NotificationSlice {
  toasts: ToastNotification[];
  addToast: (toast: Omit<ToastNotification, 'id'>) => string; // Returns the ID of the added toast;
  removeToast: (id: string) => void;
}

export const initialNotificationState: Pick<NotificationSlice, 'toasts'> = {
  toasts: [],
};

export const createNotificationSlice: StateCreator<AppStore, [], [], NotificationSlice> = set => ({
  ...initialNotificationState,
  addToast: toast => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    set(state => ({ toasts: [...state.toasts, newToast] }));
    return id;
  },
  removeToast: id => {
    set(state => ({ toasts: state.toasts.filter(t => t.id !== id) }));
  },
});
