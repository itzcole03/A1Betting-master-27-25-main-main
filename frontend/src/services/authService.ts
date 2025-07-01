import { User} from '../types/user';
import ApiService from './api/ApiService';

// Matches the Token model from backend/routes/auth_route.py;
interface BackendTokenResponse {
  access_token: string,`n  token_type: string;,`n  user: User}

// Response structure expected by the original frontend code (e.g., AuthSlice)
interface AuthServiceLoginResponse {
  user: User,`n  token: string}

/**
 * Logs in a user.
 * Expected backend response (from /api/auth/login):
 * {
 *   "access_token": "string (jwt)",
 *   "token_type": "bearer",
 *   "user": { "id": "string", "username": "string", "email": "string", ...}
 *}
 */
export const login = async (credentials: {,`n  email: string;,`n  password: string}): Promise<AuthServiceLoginResponse> => {
  try {
    const response = await ApiService.post<BackendTokenResponse>('/api/auth/login', credentials);
    // Adapt backend response to the structure AuthSlice expects;
    return {
      user: response.user,
      token: response.access_token
    }} catch (error) {
    console.error('Login failed:', error);
    throw error;}
};

// Logout is typically a client-side token removal.
// The backend /auth/logout is a placeholder but can be called for completeness.
export const logout = async (): Promise<void> => {
  try {
    // Fire-and-forget, no response needed.
    await ApiService.post('/api/auth/logout', Record<string, any>);} catch (error) {
    // Logout errors are not typically critical to the user.
    console.warn('Logout API call failed: ', error)}
};

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
export const fetchCurrentUser = async (): Promise<User> => {
  try {
    const user = await ApiService.get<User>('/api/users/me');
    return user;} catch (error) {
    console.error('Failed to fetch current user:', error);
    throw error;}
};

// Combining into a service object as per original structure;
export const authService = {
  login,
  logout,
//   fetchCurrentUser
};



`
