const dogBreeds = require('./dogs.json');
const NonEmptyStringError = require('./lib/errors.js');


const {
    validateNonEmptyString,
    validateString,
    validateNumber,
    validateBoolean,
    validateObject,
    validateUnit,
    validateCompatibilityKey,
    validateNumberRange,
    validatePreferences,
    validateBreedData,
    validateNonNegativeNumber
} = require('./lib/validations.js');
// Validate data structure once at initialization
validateBreedData(dogBreeds);
const { levenshteinDistance, parseLifespanAverage } = require('./lib/utils.js');
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
 * Find a breed by name with fuzzy/exact matching options.
 * @private
 * @param {string} breed - The breed name to find.
 * @param {Object} options - Matching options.
 * @returns {Object|null} - The breed object or null.
 */
const findBreed = (breed, { fuzzy = true, lang = 'en' } = {}) => {
    const normalized = normalizeBreed(breed);
    return dogBreeds.find(dog => {
        let name = typeof dog === 'string' ? dog : dog.name;
        if (typeof name !== 'string') return false;
        if (dog.names && typeof dog.names === 'object' && dog.names[lang]) {
            name = dog.names[lang];
        }
        const normName = normalizeBreed(name);
        if (fuzzy) {
            return normName.includes(normalized) || normalized.includes(normName);
        }
        return normName === normalized;
    }) || null;
};

/**
 * Checks if a string is a valid dog breed (supports partial/fuzzy matching).
 * @param {string} breed - The breed name to check.
 * @param {Object} [options] - Options for matching.
 * @param {boolean} [options.fuzzy=true] - Enable fuzzy/partial matching.
 * @param {string} [options.lang='en'] - Language code for breed names.
 * @returns {boolean}
 */
const isValidDogBreed = (breed, options = {}) => {
    validateNonEmptyString(breed, 'Breed name');
    return findBreed(breed, options) !== null;
};

/**
 * Get the country origin for a given dog breed name.
 * @param {string} breed - The breed name to look up.
 * @param {Object} [options] - Options for matching.
 * @param {boolean} [options.fuzzy=true] - Enable fuzzy/partial matching.
 * @param {string} [options.lang='en'] - Language code for breed names.
 * @returns {string|null}
 */
const getDogBreedOrigin = (breed, options = {}) => {
    validateNonEmptyString(breed, 'Breed name');
    const found = findBreed(breed, options);
    return found ? found.origin || null : null;
};

/**
 * Get all available data for a given dog breed.
 * @param {string} breed - The breed name to look up.
 * @param {Object} [options] - Options for matching.
 * @param {boolean} [options.fuzzy=true] - Enable fuzzy/partial matching.
 * @param {string} [options.lang='en'] - Language code for breed names.
 * @returns {Object|null} - The breed data object or null if not found.
 */
const getDogBreedData = (breed, options = {}) => {
    validateNonEmptyString(breed, 'Breed name');
    return findBreed(breed, options);
};

/**
 * Get all dog breeds from a specific country.
 * @param {string} country - The country/origin to filter by.
 * @returns {Array} - Array of dog breed objects from that country.
 */
const getDogsByCountry = (country) => {
    validateNonEmptyString(country, 'Country');
    const normalized = normalizeBreed(country);
    return dogBreeds.filter(dog => {
        if (typeof dog.origin !== 'string') return false;
        return normalizeBreed(dog.origin).includes(normalized) || normalized.includes(normalizeBreed(dog.origin));
    });
};

/**
 * Get all dog breeds of a specific size.
 * @param {string} size - The size to filter by ('small', 'medium', 'large').
 * @returns {Array} - Array of dog breed objects of that size.
 */
const getDogsBySize = (size) => {
    validateNonEmptyString(size, 'Size');
    const normalized = normalizeBreed(size);
    return dogBreeds.filter(dog => {
        if (typeof dog.size !== 'string') return false;
        return normalizeBreed(dog.size) === normalized;
    });
};

/**
 * Get all dog breeds with a specific temperament trait.
 * @param {string} trait - The temperament trait to filter by.
 * @returns {Array} - Array of dog breed objects with that temperament.
 */
const getDogsByTemperament = (trait) => {
    validateNonEmptyString(trait, 'Temperament trait');
    const normalized = normalizeBreed(trait);
    return dogBreeds.filter(dog => {
        if (!Array.isArray(dog.temperament)) return false;
        return dog.temperament.some(t => normalizeBreed(t) === normalized);
    });
};

/**
 * Get all dog breeds with a specific energy level.
 * @param {string} level - The energy level to filter by ('low', 'medium', 'high').
 * @returns {Array} - Array of dog breed objects with that energy level.
 */
const getDogsByEnergyLevel = (level) => {
    validateNonEmptyString(level, 'Energy level');
    const normalized = normalizeBreed(level);
    return dogBreeds.filter(dog => {
        if (typeof dog.energyLevel !== 'string') return false;
        return normalizeBreed(dog.energyLevel) === normalized;
    });
};

/**
 * Get all dog breeds with a specific trainability level.
 * @param {string} level - The trainability level to filter by ('low', 'moderate', 'high').
 * @returns {Array} - Array of dog breed objects with that trainability.
 */
const getDogsByTrainability = (level) => {
    validateNonEmptyString(level, 'Trainability level');
    const normalized = normalizeBreed(level);
    return dogBreeds.filter(dog => {
        if (typeof dog.trainability !== 'string') return false;
        return normalizeBreed(dog.trainability) === normalized;
    });
};

/**
 * Get all dog breeds with a specific shedding level.
 * @param {string} level - The shedding level to filter by ('minimal', 'moderate', 'heavy').
 * @returns {Array} - Array of dog breed objects with that shedding level.
 */
const getDogsByShedding = (level) => {
    validateNonEmptyString(level, 'Shedding level');
    const normalized = normalizeBreed(level);
    return dogBreeds.filter(dog => {
        if (typeof dog.shedding !== 'string') return false;
        return normalizeBreed(dog.shedding) === normalized;
    });
};

/**
 * Get all dog breeds with a specific grooming needs level.
 * @param {string} level - The grooming needs level to filter by ('low', 'moderate', 'high').
 * @returns {Array} - Array of dog breed objects with that grooming needs level.
 */
const getDogsByGroomingNeeds = (level) => {
    validateNonEmptyString(level, 'Grooming needs level');
    const normalized = normalizeBreed(level);
    return dogBreeds.filter(dog => {
        if (typeof dog.groomingNeeds !== 'string') return false;
        return normalizeBreed(dog.groomingNeeds) === normalized;
    });
};

/**
 * Get all dog breeds with specific compatibility traits.
 * @param {string} key - The compatibility key ('children', 'otherDogs', 'cats').
 * @param {boolean} value - The compatibility value (true/false).
 * @returns {Array} - Array of dog breed objects with that compatibility.
 */
const getDogsByCompatibility = (key, value) => {
    validateCompatibilityKey(key);
    validateBoolean(value, 'Compatibility value');
    return dogBreeds.filter(dog => {
        if (!dog.compatibility || typeof dog.compatibility !== 'object') return false;
        return dog.compatibility[key] === value;
    });
};

/**
 * Unit aliases mapping for weight conversions.
 * @private
 */

/**
 * Get all dog breeds within a specific weight range.
 * @param {number} min - First weight value (automatically sorted to be min).
 * @param {number} max - Second weight value (automatically sorted to be max).
 * @param {string} [unit='lbs'] - Unit of weight: 'lbs'/'lb', 'kgs'/'kg'/'kilograms'/'kilos'/'pounds'.
 * @returns {Array} - Array of dog breed objects within that weight range.
 */
const getDogsByWeightRange = (min, max, unit = 'lbs') => {
    validateNumberRange(min, max);

    // Automatically sort so lower number is always min
    const sortedMin = Math.min(min, max);
    const sortedMax = Math.max(min, max);

    // Normalize and validate unit
    const normalizedUnit = validateUnit(unit);

    return dogBreeds.filter(dog => {
        if (!dog.weight) return false;
        const weightData = normalizedUnit === 'kgs' ? dog.weight.kgs : dog.weight.lbs;
        if (!weightData) return false;
        const dogMin = weightData.min;
        const dogMax = weightData.max;
        return !(dogMax < sortedMin || dogMin > sortedMax);
    });
};

/**
 * Performs fuzzy search on dog breed names.
 * @param {string} searchTerm - The search term (partial breed name).
 * @param {number} [maxDistance=2] - Maximum Levenshtein distance for matches.
 * @returns {Array} - Array of matching dog breeds sorted by relevance.
 */
const fuzzySearchBreeds = (searchTerm, maxDistance = 2) => {
    validateNonEmptyString(searchTerm, 'Search term');
    validateNonNegativeNumber(maxDistance, 'maxDistance');
    const normalized = normalizeBreed(searchTerm);

    // First, collect all substring matches
    const substringMatches = dogBreeds.filter(dog => {
        const dogName = normalizeBreed(dog.name);
        return dogName.includes(normalized) || normalized.includes(dogName);
    });

    // Then, collect fuzzy matches (excluding substring matches)
    const fuzzyMatches = dogBreeds.filter(dog => {
        const dogName = normalizeBreed(dog.name);
        if (dogName.includes(normalized) || normalized.includes(dogName)) return false;
        const distance = levenshteinDistance(normalized, dogName);
        return distance <= maxDistance;
    }).map(dog => {
        const dogName = normalizeBreed(dog.name);
        return { ...dog, _matchScore: levenshteinDistance(normalized, dogName) };
    });

    // Sort fuzzy matches by match score
    fuzzyMatches.sort((a, b) => a._matchScore - b._matchScore);

    // Return substring matches first, then fuzzy matches (without _matchScore)
    return [
        ...substringMatches,
        ...fuzzyMatches.map(({ _matchScore, ...dog }) => dog)
    ];
};
const fuzzySearchBreeds2 = (searchTerm, maxDistance = 2) => {
    validateNonEmptyString(searchTerm, 'Search term');
    validateNonNegativeNumber(maxDistance, 'maxDistance');

    const normalized = normalizeBreed(searchTerm);
    return dogBreeds
        .map(dog => {
            const dogName = normalizeBreed(dog.name);
            const distance = levenshteinDistance(normalized, dogName);
            const isPartialMatch = dogName.includes(normalized) || normalized.includes(dogName);
            return { ...dog, _matchScore: isPartialMatch ? 0 : distance };
        }).filter(dog => {
            return dog._matchScore <= maxDistance;
        }).sort((a, b) => a._matchScore - b._matchScore)
        .map(({ _matchScore, ...dog }) => dog);
};

/**
 * Compare two dog breeds side-by-side.
 * @param {string} breed1 - First breed name.
 * @param {string} breed2 - Second breed name.
 * @returns {Object} - Comparison object with both breeds' properties.
 */
const compareBreeds = (breed1, breed2) => {
    validateNonEmptyString(breed1, 'Breed 1');
    validateNonEmptyString(breed2, 'Breed 2');

    const dog1 = getDogBreedData(breed1, { fuzzy: true });
    const dog2 = getDogBreedData(breed2, { fuzzy: true });

    if (!dog1) throw new Error(`Breed "${breed1}" not found`);
    if (!dog2) throw new Error(`Breed "${breed2}" not found`);

    return {
        breed1: dog1,
        breed2: dog2,
        comparison: {
            size: {
                breed1: dog1.size,
                breed2: dog2.size,
                match: dog1.size === dog2.size
            },
            energyLevel: {
                breed1: dog1.energyLevel,
                breed2: dog2.energyLevel,
                match: dog1.energyLevel === dog2.energyLevel
            },
            trainability: {
                breed1: dog1.trainability,
                breed2: dog2.trainability,
                match: dog1.trainability === dog2.trainability
            },
            shedding: {
                breed1: dog1.shedding,
                breed2: dog2.shedding,
                match: dog1.shedding === dog2.shedding
            },
            lifespan: {
                breed1: dog1.lifespan,
                breed2: dog2.lifespan,
                match: dog1.lifespan === dog2.lifespan
            },
            groomingNeeds: {
                breed1: dog1.groomingNeeds,
                breed2: dog2.groomingNeeds,
                match: dog1.groomingNeeds === dog2.groomingNeeds
            },
            origin: {
                breed1: dog1.origin,
                breed2: dog2.origin,
                match: dog1.origin === dog2.origin
            },
            compatibility: {
                breed1: dog1.compatibility,
                breed2: dog2.compatibility,
                children: {
                    breed1: dog1.compatibility?.children || false,
                    breed2: dog2.compatibility?.children || false,
                    match: dog1.compatibility?.children === dog2.compatibility?.children
                },
                otherDogs: {
                    breed1: dog1.compatibility?.otherDogs || false,
                    breed2: dog2.compatibility?.otherDogs || false,
                    match: dog1.compatibility?.otherDogs === dog2.compatibility?.otherDogs
                },
                cats: {
                    breed1: dog1.compatibility?.cats || false,
                    breed2: dog2.compatibility?.cats || false,
                    match: dog1.compatibility?.cats === dog2.compatibility?.cats
                }
            },
            weight: {
                breed1: dog1.weight,
                breed2: dog2.weight
            }
        }
    };
};

/**
 * Get recommended dog breeds based on multiple preference criteria.
 * @param {Object} preferences - Search preferences object.
 * @param {string} [preferences.size] - Desired size: 'small', 'medium', 'large'.
 * @param {string} [preferences.energyLevel] - Desired energy: 'low', 'medium', 'high'.
 * @param {string} [preferences.trainability] - Desired trainability: 'low', 'moderate', 'high'.
 * @param {string} [preferences.shedding] - Preferred shedding: 'minimal', 'moderate', 'heavy'.
 * @param {string} [preferences.groomingNeeds] - Grooming needs: 'low', 'moderate', 'high'.
 * @param {string} [preferences.origin] - Country of origin.
 * @param {Object} [preferences.compatibility] - Compatibility object with boolean flags.
 * @param {boolean} [preferences.compatibility.children] - Good with children.
 * @param {boolean} [preferences.compatibility.otherDogs] - Good with other dogs.
 * @param {boolean} [preferences.compatibility.cats] - Good with cats.
 * @param {Object} [preferences.weightRange] - Weight range object.
 * @param {number} [preferences.weightRange.min] - Minimum weight.
 * @param {number} [preferences.weightRange.max] - Maximum weight.
 * @param {string} [preferences.weightRange.unit='lbs'] - Weight unit: 'lbs' or 'kgs'.
 * @param {number} [preferences.minLifespan=0] - Minimum lifespan in years.
 * @returns {Array} - Array of matching breeds sorted by match score (highest first).
 */
const getRecommendedBreeds = (preferences = {}) => {
    const { size, energyLevel, trainability, shedding, groomingNeeds, origin, compatibility, weightRange, minLifespan = 0 } = preferences;
    if (typeof preferences !== 'object' || preferences === null) {
        throw new TypeError('Preferences must be an object');
    }

    return dogBreeds.filter(dog => {
        // Check each preference, return false if any do not match
        if (size && dog.size !== size) return false;
        if (energyLevel && dog.energyLevel !== energyLevel) return false;
        if (trainability && dog.trainability !== trainability) return false;
        if (shedding && dog.shedding !== shedding) return false;
        if (groomingNeeds && dog.groomingNeeds !== groomingNeeds) return false;
        if (origin && dog.origin !== origin) return false;
        if (compatibility) {
            if (!dog.compatibility) return false;
            if (typeof compatibility.children === 'boolean' && dog.compatibility.children !== compatibility.children) return false;
            if (typeof compatibility.otherDogs === 'boolean' && dog.compatibility.otherDogs !== compatibility.otherDogs) return false;
            if (typeof compatibility.cats === 'boolean' && dog.compatibility.cats !== compatibility.cats) return false;
        }
        if (weightRange && dog.weight) {
            const unit = weightRange.unit || 'lbs';
            const weightData = unit === 'kgs' ? dog.weight.kgs : dog.weight.lbs;
            if (!weightData) return false;
            const dogMin = weightData.min;
            const dogMax = weightData.max;
            const inRange = !(dogMax < weightRange.min || dogMin > weightRange.max);
            if (!inRange) return false;
        } else if (weightRange) {
            return false;
        }
        if (minLifespan > 0 && dog.lifespan) {
            const avgLifespan = parseLifespanAverage(dog.lifespan);
            if (avgLifespan !== null && avgLifespan < minLifespan) return false;
        } else if (minLifespan > 0) {
            return false;
        }
        return true;
    });
};

module.exports = {
    isValidDogBreed,
    getDogBreedOrigin,
    getDogBreedData,
    getDogsByCountry,
    getDogsBySize,
    getDogsByTemperament,
    getDogsByEnergyLevel,
    getDogsByTrainability,
    getDogsByShedding,
    getDogsByGroomingNeeds,
    getDogsByCompatibility,
    getDogsByWeightRange,
    fuzzySearchBreeds,
    compareBreeds,
    getRecommendedBreeds,
    NonEmptyStringError
};