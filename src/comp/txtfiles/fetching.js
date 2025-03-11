import axios from 'axios';

const BUTTON_STATES_URL = process.env.REACT_APP_but; // Add this to your .env file

export const fetchButtonStates = async () => {
  try {
    // Use Axios to fetch the JSON file directly from the S3 public URL
    const response = await axios.get(BUTTON_STATES_URL);
    if (response.data) {
      return response.data; // Successfully fetched and parsed data
    } else {
      throw new Error('Fetched data is empty or invalid');
    }
  } catch (error) {
    console.error('Error fetching button states:', error.message);
    // Return default states if there's an error
    return {
      buttonfootball: 0,
      buttonNFL: 0,
      buttonJobData: 0,
      buttonLocalNews: 0,
    };
  }
};
