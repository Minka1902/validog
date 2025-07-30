const dogBreeds = require('./dogs.json');

/**
 * Normalize a breed name for comparison.
 * @param {string} breed - The breed name to normalize.
 * @returns {string}
 */
const normalizeBreed = (breed) => {
    if (typeof breed !== 'string') throw new TypeError('Breed name must be a string');
    return breed.trim().toLowerCase();
};

/**
 * Checks if a string is a valid dog breed (supports partial/fuzzy matching).
 * @param {string} breed - The breed name to check.
 * @param {Object} [options] - Options for matching.
 * @param {boolean} [options.fuzzy=false] - Enable fuzzy/partial matching.
 * @param {string} [options.lang='en'] - Language code for breed names.
 * @returns {boolean}
 */
const isValidDogBreed = (breed, options = {}) => {
    if (!Array.isArray(dogBreeds)) throw new Error('dogBreeds data is not an array');
    if (typeof breed !== 'string' || breed.trim() === '') throw new TypeError('Breed name must be a non-empty string');
    const { fuzzy = true, lang = 'en' } = options;
    const normalized = normalizeBreed(breed);
    return dogBreeds.some(b => {
        let name = typeof b === 'string' ? b : b.name;
        if (typeof name !== 'string') return false;
        // Multi-language support
        if (b.names && typeof b.names === 'object' && b.names[lang]) {
            name = b.names[lang];
        }
        const normName = normalizeBreed(name);
        if (fuzzy) {
            return normName.includes(normalized) || normalized.includes(normName);
        }
        return normName === normalized;
    });
};

/**
 * Get the country origin for a given dog breed name.
 * @param {string} breed - The breed name to look up.
 * @param {Object} [options] - Options for matching.
 * @param {boolean} [options.fuzzy=false] - Enable fuzzy/partial matching.
 * @param {string} [options.lang='en'] - Language code for breed names.
 * @returns {string|null}
 */
const getDogBreedOrigin = (breed, options = {}) => {
    if (!Array.isArray(dogBreeds)) throw new Error('dogBreeds data is not an array');
    if (typeof breed !== 'string' || breed.trim() === '') throw new TypeError('Breed name must be a non-empty string');
    const { fuzzy = true, lang = 'en' } = options;
    const normalized = normalizeBreed(breed);
    const found = dogBreeds.find(b => {
        let name = typeof b === 'string' ? b : b.name;
        if (typeof name !== 'string') return false;
        if (b.names && typeof b.names === 'object' && b.names[lang]) {
            name = b.names[lang];
        }
        const normName = normalizeBreed(name);
        if (fuzzy) {
            return normName.includes(normalized) || normalized.includes(normName);
        }
        return normName === normalized;
    });
    return found ? found.origin || null : null;
};

/**
 * Get all available data for a given dog breed.
 * @param {string} breed - The breed name to look up.
 * @param {Object} [options] - Options for matching.
 * @param {boolean} [options.fuzzy=false] - Enable fuzzy/partial matching.
 * @param {string} [options.lang='en'] - Language code for breed names.
 * @returns {Object|null} - The breed data object or null if not found.
 */
const getDogBreedData = (breed, options = {}) => {
    if (!Array.isArray(dogBreeds)) throw new Error('dogBreeds data is not an array');
    if (typeof breed !== 'string' || breed.trim() === '') throw new TypeError('Breed name must be a non-empty string');
    const { fuzzy = true, lang = 'en' } = options;
    const normalized = normalizeBreed(breed);
    const found = dogBreeds.find(b => {
        let name = typeof b === 'string' ? b : b.name;
        if (typeof name !== 'string') return false;
        if (b.names && typeof b.names === 'object' && b.names[lang]) {
            name = b.names[lang];
        }
        const normName = normalizeBreed(name);
        if (fuzzy) {
            return normName.includes(normalized) || normalized.includes(normName);
        }
        return normName === normalized;
    });
    return found || null;
};

module.exports = {
    isValidDogBreed,
    getDogBreedOrigin,
    getDogBreedData
};

