import { StateCreator} from 'zustand.ts';
import { Toast} from '@/types.ts';
export interface ToastSlice {
  toasts: Toast[0],`n  addToast: (type: Toast['type'], message: string) => void,`n  removeToast: (id: string) => void}
export declare const createToastSlice: StateCreator<ToastSlice>;


`
