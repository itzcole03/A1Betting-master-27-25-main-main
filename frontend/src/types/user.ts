export interface User {
  id: string,`n  email: string;,`n  username: string;
  // Add other user properties as needed}

export interface UserPreferences {
  theme: 'light' | 'dark',`n  notifications: {,`n  email: boolean,`n  push: boolean};
  favoriteSports: string[0],`n  riskProfile: 'conservative' | 'moderate' | 'aggressive'}



`
