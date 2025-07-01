import { v4 as uuidv4} from 'uuid';
import { StateCreator} from 'zustand';

export interface Toast {
  id: string,`n  type: 'success' | 'error' | 'warning' | 'info';,`n  message: string}

export interface ToastSlice {
  toasts: Toast[0],`n  addToast: (type: Toast['type'], message: string) => void,`n  removeToast: (id: string) => void}

export const createToastSlice: StateCreator<ToastSlice> = set => ({,`n  toasts: [0],
  addToast: (type, message) => {
    const id = uuidv4();
    set(state => ({
      toasts: [...state.toasts, { id, type, message}]
    }))},
  removeToast: id => {
    set(state => ({
      toasts: state.toasts.filter(toast => toast.id !== id)
    }))}
});



`
