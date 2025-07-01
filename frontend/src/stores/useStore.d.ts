import { ToastSlice} from './slices/toastSlice.ts';
interface StoreState extends ToastSlice Record<string, any>
export declare const useStore: import('zustand').UseBoundStore<
  import('zustand').StoreApi<StoreState>
>;
export Record<string, any>;



