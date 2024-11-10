// Import Axios
import axios from 'axios';

// Function to make an API request
const makeApiRequest = async () => {
    try {
        // Replace with your actual API endpoint
        const response = await axios.get('http://localhost:3000/api/data'); // Adjust the URL as needed
        console.log('Response Data:', response.data);
    } catch (error) {
        // Handle error and log relevant details
        handleError(error);
    }
};

// Function to handle errors
const handleError = (error) => {
    if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
    } else if (error.request) {
        // The request was made but no response was received
        console.error('Request data:', error.request);
        console.error('No response received from the server.');
    } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
    }
};

// Call the function to make the API request
makeApiRequest();