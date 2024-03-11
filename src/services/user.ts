import { User } from '@/types';
import { BASE_API_URL } from '@/utils/constants';

/**
 * Fetches the user from the API.
 * @returns {Promise<User>} A promise that resolves to the fetched user.
 */
export const getUser = async (): Promise<User> => {
  try {
    const res = await fetch(`${BASE_API_URL}/user.json`);
    return await res.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Error fetching user');
  }
};
