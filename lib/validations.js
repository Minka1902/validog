/**
 * Validation library for validog
 * Centralized validation functions and error handling
 */

const NonEmptyStringError = require('./errors.js');

/**
 * Unit aliases mapping for weight conversions.
 */
const UNIT_ALIASES = {
    kgs: new Set(['kg', 'kgs', 'kilogram', 'kilograms', 'kilo', 'kilos']),
    lbs: new Set(['lb', 'lbs', 'pound', 'pounds'])
};

/**
 * Valid compatibility keys
 */
const VALID_COMPATIBILITY_KEYS = ['children', 'otherDogs', 'cats'];

/**
 * Validate that a value is a non-empty string.
 * @param {*} value - Value to validate.
 * @param {string} fieldName - Field name for error message.
 * @throws {NonEmptyStringError} If value is not a non-empty string.
 */
const validateNonEmptyString = (value, fieldName) => {
    if (typeof value !== 'string' || value.trim() === '') {
        throw new NonEmptyStringError(fieldName);
    }
};

/**
 * Validate that a value is a string.
 * @param {*} value - Value to validate.
 * @param {string} fieldName - Field name for error message.
 * @throws {TypeError} If value is not a string.
 */
const validateString = (value, fieldName) => {
    if (typeof value !== 'string') {
        throw new TypeError(`${fieldName} must be a string`);
    }
};

/**
 * Validate that a value is a number.
 * @param {*} value - Value to validate.
 * @param {string} fieldName - Field name for error message.
 * @throws {TypeError} If value is not a number.
 */
const validateNumber = (value, fieldName) => {
    if (typeof value !== 'number') {
        throw new TypeError(`${fieldName} must be a number`);
    }
};

/**
 * Validate that a value is a boolean.
 * @param {*} value - Value to validate.
 * @param {string} fieldName - Field name for error message.
 * @throws {TypeError} If value is not a boolean.
 */
const validateBoolean = (value, fieldName) => {
    if (typeof value !== 'boolean') {
        throw new TypeError(`${fieldName} must be a boolean`);
    }
};

/**
 * Validate that a value is an object (not null, not array).
 * @param {*} value - Value to validate.
 * @param {string} fieldName - Field name for error message.
 * @throws {TypeError} If value is not an object.
 */
const validateObject = (value, fieldName) => {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        throw new TypeError(`${fieldName} must be an object`);
    }
};

/**
 * Validate that a value is an array.
 * @param {*} value - Value to validate.
 * @param {string} fieldName - Field name for error message.
 * @throws {TypeError} If value is not an array.
 */
const validateArray = (value, fieldName) => {
    if (!Array.isArray(value)) {
        throw new TypeError(`${fieldName} must be an array`);
    }
};

/**
 * Validate that a value is a positive number.
 * @param {*} value - Value to validate.
 * @param {string} fieldName - Field name for error message.
 * @throws {TypeError} If value is not a positive number.
 */
const validatePositiveNumber = (value, fieldName) => {
    validateNumber(value, fieldName);
    if (value <= 0) {
        throw new TypeError(`${fieldName} must be a positive number`);
    }
};

/**
 * Validate that a value is a non-negative number.
 * @param {*} value - Value to validate.
 * @param {string} fieldName - Field name for error message.
 * @throws {TypeError} If value is not a non-negative number.
 */
const validateNonNegativeNumber = (value, fieldName) => {
    validateNumber(value, fieldName);
    if (value < 0) {
        throw new TypeError(`${fieldName} must be a non-negative number`);
    }
};

/**
 * Validate and normalize a weight unit.
 * @param {string} [unit='lbs'] - Unit to validate and normalize.
 * @returns {string} - Normalized unit ('kgs' or 'lbs').
 * @throws {TypeError} If unit is not valid.
 */
const validateUnit = (unit = 'lbs') => {
    validateString(unit, 'Unit');
    const normalized = unit.toLowerCase().trim();
    if (UNIT_ALIASES.kgs.has(normalized)) return 'kgs';
    if (UNIT_ALIASES.lbs.has(normalized)) return 'lbs';
    throw new TypeError('Unit must be "lbs"/"lb"/"pounds"/"pound" or "kgs"/"kg"/"kilograms"/"kilos"');
};

/**
 * Validate that a value is one of allowed options.
 * @param {*} value - Value to validate.
 * @param {Array} allowedValues - Array of allowed values.
 * @param {string} fieldName - Field name for error message.
 * @throws {TypeError} If value is not in allowed values.
 */
const validateOneOf = (value, allowedValues, fieldName) => {
    validateArray(allowedValues, 'allowedValues');
    if (!allowedValues.includes(value)) {
        throw new TypeError(`${fieldName} must be one of: ${allowedValues.join(', ')}`);
    }
};

/**
 * Validate that a value is a valid compatibility key.
 * @param {*} value - Value to validate.
 * @throws {TypeError} If value is not a valid compatibility key.
 */
const validateCompatibilityKey = (value) => {
    if (!VALID_COMPATIBILITY_KEYS.includes(value)) {
        throw new TypeError(`Compatibility key must be one of: ${VALID_COMPATIBILITY_KEYS.join(', ')}`);
    }
};

/**
 * Validate two numbers for weight range (min/max).
 * @param {*} min - Minimum value.
 * @param {*} max - Maximum value.
 * @throws {TypeError} If either value is not a number.
 */
const validateNumberRange = (min, max) => {
    validateNumber(min, 'Min weight');
    validateNumber(max, 'Max weight');
};

/**
 * Validate that a preferences object is valid.
 * @param {*} preferences - Object to validate.
 * @throws {TypeError} If not a valid preferences object.
 */
const validatePreferences = (preferences) => {
    if (typeof preferences !== 'object' || preferences === null || Array.isArray(preferences)) {
        throw new TypeError('Preferences must be an object');
    }
};

/**
 * Validate data structure (array of breeds).
 * @param {*} data - Data to validate.
 * @throws {Error} If data is not an array.
 */
const validateBreedData = (data) => {
    if (!Array.isArray(data)) {
        throw new Error('Breed data must be an array');
    }
};

module.exports = {
    // Constants
    UNIT_ALIASES,
    VALID_COMPATIBILITY_KEYS,
    
    // String validations
    validateNonEmptyString,
    validateString,
    
    // Number validations
    validateNumber,
    validatePositiveNumber,
    validateNonNegativeNumber,
    
    // Boolean validations
    validateBoolean,
    
    // Object/Array validations
    validateObject,
    validateArray,
    
    // Domain-specific validations
    validateUnit,
    validateOneOf,
    validateCompatibilityKey,
    validateNumberRange,
    validatePreferences,
    validateBreedData
};
