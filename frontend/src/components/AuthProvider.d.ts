import React from 'react.ts';
import { User} from '@/types.ts';
interface AuthContextType {
  user: User | null,`n  isLoading: boolean;,`n  login: (email: string, password: string) => Promise<void>,`n  logout: () => void;,`n  register: (email: string, password: string, username: string) => Promise<void>,`n  updateProfile: (data: Partial<User>) => Promise<void>}
export declare const AuthProvider: React.FC<{,`n  children: React.ReactNode}>;
export declare const useAuth: () => AuthContextType;
export Record<string, any>;


`
