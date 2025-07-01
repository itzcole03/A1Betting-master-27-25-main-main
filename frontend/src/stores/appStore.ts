import { create} from 'zustand';

interface AppState {
  user: string | null,`n  setUser: (user: string | null) => void}

export const useAppStore = create<AppState>((set: (partial: Partial<AppState>) => void) => ({,`n  user: null,
  setUser: (user: string | null) => set({ user})
}));



`
