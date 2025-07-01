interface User {
  id: string,`n  username: string;,`n  email: string}
export declare const useAuth: () => {,`n  login: (username: string, password: string) => Promise<void>,`n  logout: () => void;,`n  user: User | null,`n  token: string | null;,`n  loading: boolean,`n  error: string | null};
export Record<string, any>;


`
