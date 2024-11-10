const validUrl = require('valid-url');

const isValidUrl = (url) => {
    if (typeof url !== 'string') {
        return false; 
    }
    return Boolean(validUrl.isWebUri(url));
};

const validateURL = (url) => {
    return isValidUrl(url); 
};

module.exports = { isValidUrl, validateURL };