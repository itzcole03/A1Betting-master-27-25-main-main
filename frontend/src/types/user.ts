export interface User {
    id: string;
    email: string;
    username: string;
    // Add other user properties as needed
}

export interface UserPreferences {
    theme: 'light' | 'dark';
    notifications: {
        email: boolean;
        push: boolean;
    };
    favoriteSports: string[];
    riskProfile: 'conservative' | 'moderate' | 'aggressive';
}
