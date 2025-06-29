import { PrizePicksEntry } from '../types/prizePicks';
import { User, UserPreferences } from '../types/user';
import ApiService from './api/ApiService';

/**
 * UserService: Handles user profile, preferences, and entry retrieval.
 * All methods are type-safe and production-ready.
 */
export class UserService {
  /**
   * Fetch all PrizePicks entries for a user.
   */
  async fetchUserEntries(userId: string): Promise<PrizePicksEntry[]> {
    try {
      const entries = await ApiService.get<PrizePicksEntry[]>(
        `/api/v1/users/${userId}/entries`
      );
      return entries;
    } catch (error) {
      console.error(`Failed to fetch user entries for user ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Fetch the user profile for a given userId.
   */
  async fetchUserProfile(userId: string): Promise<User> {
    try {
      const user = await ApiService.get<User>(`/api/v1/users/${userId}`);
      return user;
    } catch (error) {
      console.error(`Failed to fetch user profile for user ${userId}:`, error);
      throw error;
    }
  }

  /**
   * Update user preferences for a given userId.
   */
  async updateUserPreferences(
    userId: string,
    preferences: UserPreferences
  ): Promise<User> {
    try {
      const updatedUser = await ApiService.put<User>(
        `/api/v1/users/${userId}/preferences`,
        preferences
      );
      return updatedUser;
    } catch (error) {
      console.error(
        `Failed to update user preferences for user ${userId}:`,
        error
      );
      throw error;
    }
  }
}

export const userService = new UserService();