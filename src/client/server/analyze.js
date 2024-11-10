const axios = require('axios');
const meaningCloud = "https://api.meaningcloud.com/sentiment-2.1";
const axiosInstance = axios.create({
    baseURL: 'https://api.meaningcloud.com/sentiment-2.1',
    proxy: {
        host: 'PROXY_HOST',
        port: PROXY_PORT,
        // If your proxy requires authentication
        auth: {
            username: 'USERNAME',
            password: 'PASSWORD'
        }
    }
});

const analyze = async (url, key) => {
    try {
        // Make the API request
        const response = await axios.get(`${meaningCloud}?key=${key}&url=${url}&lang=en`);
        
        // Destructure the response to get the status code and message
        const { code, msg } = response.data.status;

        // Handle different response codes
        if (code === 100) {
            return handleErrors(code, "Enter a valid article");
        } else if (code === 212) {
            return handleErrors(code, msg);
        }

        // Successful response
        return handleSuccess(response.data, code);
    } catch (error) {
        // Log the error for debugging
        console.error('Error occurred during API request:', error);

        // Handle network errors
        if (error.response) {
            // The request was made and the server responded with a status code
            return handleErrors(error.response.status, error.response.data.message || "An error occurred");
        } else if (error.request) {
            // The request was made but no response was received
            return handleErrors(500, "No response received from the server");
        } else {
            // Something happened in setting up the request that triggered an Error
            return handleErrors(500, error.message);
        }
    }
};

const handleErrors = (code, msg) => {
    // Create an error object
    const error = { code, msg };
    return error;
};

const handleSuccess = (data, code) => {
    // Destructure the necessary fields from the response data
    const { agreement, subjectivity, confidence, irony, score_tag } = data;

    // Create a sample object with the relevant data
    const sample = { agreement, subjectivity, confidence, irony, score_tag };
    
    // Create a result object that includes both the sample data and the code
    const result = { sample, code };

    return result; // Return the result object
};

module.exports = { analyze };