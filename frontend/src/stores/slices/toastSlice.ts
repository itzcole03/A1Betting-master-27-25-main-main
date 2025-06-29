import { v4 as uuidv4 } from 'uuid';
import { StateCreator } from 'zustand';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

export interface ToastSlice {
  toasts: Toast[];
  addToast: (type: Toast['type'], message: string) => void;
  removeToast: (id: string) => void;
}

export const createToastSlice: StateCreator<ToastSlice> = set => ({
  toasts: [],
  addToast: (type, message) => {
    const id = uuidv4();
    set(state => ({
      toasts: [...state.toasts, { id, type, message }],
    }));
  },
  removeToast: id => {
    set(state => ({
      toasts: state.toasts.filter(toast => toast.id !== id),
    }));
  },
});
