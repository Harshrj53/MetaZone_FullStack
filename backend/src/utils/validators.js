/**
 * Common validation utilities
 */

const isEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const isStrongPassword = (password) => {
    // At least 6 characters
    return password && password.length >= 6;
};

const isValidPrice = (price) => {
    return !isNaN(price) && parseFloat(price) >= 0;
};

const isValidQuantity = (quantity) => {
    return Number.isInteger(quantity) && quantity > 0;
};

const sanitizeString = (str) => {
    if (typeof str !== 'string') return '';
    return str.trim();
};

module.exports = {
    isEmail,
    isStrongPassword,
    isValidPrice,
    isValidQuantity,
    sanitizeString,
};
