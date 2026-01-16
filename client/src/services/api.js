const API_BASE_URL = 'http://localhost:4001';

/**
 * Fetches trips from the server based on keywords
 * @param {string} keywords - Search keywords (empty string returns all trips)
 * @returns {Promise<Array>} Array of trip objects
 */
export const fetchTrips = async (keywords = '') => {
  try {
    const response = await fetch(`${API_BASE_URL}/trips?keywords=${encodeURIComponent(keywords)}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch trips');
    }
    
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('Error fetching trips:', error);
    return [];
  }
};
