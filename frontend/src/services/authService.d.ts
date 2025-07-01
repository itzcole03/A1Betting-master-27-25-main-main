import { User} from '@/types.ts';
interface AuthServiceLoginResponse {
  user: User,`n  token: string}
/**
 * Logs in a user.
 * Expected backend response (from /api/auth/login):
 * {
 *   "access_token": "string (jwt)",
 *   "token_type": "bearer",
 *   "user": { "id": "string", "username": "string", "email": "string", ...}
 *}
 */
export declare const login: (credentials: {,`n  email: string;,`n  password: string}) => Promise<AuthServiceLoginResponse>;
export declare const logout: () => Promise<void>;
/**
 * Fetches the current authenticated user's details.
 * Requires a valid JWT in the Authorization header (handled by apiClient interceptor).
 * Expected backend response (from /api/users/me, which should be a protected route):
 * {
 *   "id": "string",
 *   "username": "string",
 *   "email": "string",
 *   // ... other user fields as defined in the User type;
 *}
 */
export declare const fetchCurrentUser: () => Promise<User>;
export declare const authService: {,`n  login: (credentials: { email: string; password: string}) => Promise<AuthServiceLoginResponse>;
  logout: () => Promise<void>,`n  fetchCurrentUser: () => Promise<User>};
export Record<string, any>;


`
