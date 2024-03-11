import { Plan } from '@/types';
import { BASE_API_URL } from '@/utils/constants';

/**
 * Fetches the plans from the API.
 * @returns {Promise<Plan[]>} A promise that resolves to the fetched plans.
 */
export const getPlans = async (): Promise<Plan[]> => {
  try {
    const res = await fetch(`${BASE_API_URL}/plans.json`);
    const data = await res.json();
    return data.list;
  } catch (error) {
    console.error('Error fetching plans:', error);
    return [];
  }
};
