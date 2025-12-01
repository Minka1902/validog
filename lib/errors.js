/**
 * NonEmptyStringError
 * 
 * Custom error class for validog library
 * Thrown when string parameters are empty or contain only whitespace
 * 
 * @class NonEmptyStringError
 * @extends {TypeError}
 * 
 * @example
 * try {
 *   getDogsBySize('');
 * } catch (error) {
 *   if (error instanceof NonEmptyStringError) {
 *     console.error(`${error.fieldName}: ${error.message}`);
 *   }
 * }
 */
class NonEmptyStringError extends TypeError {
    /**
     * Create a NonEmptyStringError
     * @param {string} fieldName - The name of the field that failed validation
     * @throws {NonEmptyStringError}
     */
    constructor(fieldName) {
        super(`${fieldName} cannot be empty. Please provide a non-empty string.`);
        this.name = 'NonEmptyStringError';
        this.fieldName = fieldName;
    }
}

module.exports = NonEmptyStringError;
