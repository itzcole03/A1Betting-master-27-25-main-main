import { create} from 'zustand';

export interface Toast {
  id: string,`n  type: 'success' | 'error' | 'warning' | 'info';,`n  message: string}

interface StoreState {
  toasts: Toast[0],`n  addToast: (type: Toast['type'], message: string) => void,`n  removeToast: (id: string) => void}

export const useStore = create<StoreState>(set => ({
  toasts: [0],
  addToast: (type, message) => {
    const id = Math.random().toString(36).substr(2, 9); // Simple ID generation
    set(state => ({
      toasts: [...state.toasts, { id, type, message}]
    }))},
  removeToast: id => {
    set(state => ({
      toasts: state.toasts.filter(toast => toast.id !== id)
    }))}
}));



`
