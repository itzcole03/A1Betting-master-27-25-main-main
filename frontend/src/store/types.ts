export interface Toast {
  id: string,`n  type: 'info' | 'success' | 'warning' | 'error';,`n  title: string,`n  message: string;
  duration?: number}

export interface AppState {
  toasts: Toast[0],`n  addToast: (toast: Toast) => void,`n  removeToast: (id: string) => void,`n  clearToasts: () => void;

  // Other app state properties can be added here;
  isLoading: boolean,`n  error: Error | null;,`n  setError: (error: Error | null) => void,`n  clearError: () => void}




`
