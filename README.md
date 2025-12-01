# 🐕 Validog

A powerful JavaScript and TypeScript package for dog breed discovery and analysis. Get detailed information about any of **514 dog breeds** with smart filtering, fuzzy search, comparisons, and personalized recommendations.

> **514 breeds** • **15 functions** • **100% complete data** • **TypeScript support**

---

## 📦 Installation

```bash
npm install validog
```

---

## 🚀 Quick Start

```js
const { 
  isValidDogBreed,
  getDogBreedData,
  getDogsBySize,
  getDogsByEnergyLevel,
  fuzzySearchBreeds,
  compareBreeds,
  getRecommendedBreeds
} = require('validog');

// ✅ Check if a breed exists
isValidDogBreed('Labrador Retriever'); // true

// 📋 Get complete breed information
getDogBreedData('Golden Retriever');
// {
//   name: 'Golden Retriever',
//   origin: 'Canada, United Kingdom (Scotland)',
//   size: 'large',
//   energyLevel: 'high',
//   trainability: 'high',
//   shedding: 'heavy',
//   ...
// }

// 🔍 Smart filtering
getDogsBySize('small');               // All small breeds
getDogsByEnergyLevel('high');         // High-energy dogs

// 🎯 Advanced features
fuzzySearchBreeds('Retriever');                            // Typo-tolerant search
compareBreeds('Golden Retriever', 'Labrador');           // Side-by-side comparison
getRecommendedBreeds({ size: 'small', energyLevel: 'low' }); // Smart recommendations
```

---

## 📚 Full API Reference

### Core Functions

#### `isValidDogBreed(breed: string): boolean`

Check if a string is a valid dog breed.

```js
isValidDogBreed('Labrador');           // ✅ true
isValidDogBreed('Lab Retriever');      // ✅ true (fuzzy match)
isValidDogBreed('NotADog');            // ❌ false
```

---

#### `getDogBreedOrigin(breed: string): string | null`

Get the country/region of origin for a breed.

```js
getDogBreedOrigin('German Shepherd Dog'); // "Germany"
getDogBreedOrigin('Labrador Retriever');  // "Canada, United Kingdom (England)"
getDogBreedOrigin('FakeDog');             // null
```

---

#### `getDogBreedData(breed: string): DogBreedData | null`

Get all available data for a breed.

```js
getDogBreedData('Golden Retriever');
// Returns:
// {
//   name: 'Golden Retriever',
//   origin: 'Canada, United Kingdom (Scotland)',
//   size: 'large',
//   temperament: ['friendly', 'intelligent', 'devoted'],
//   energyLevel: 'high',
//   trainability: 'high',
//   shedding: 'heavy',
//   lifespan: '10-12 years',
//   groomingNeeds: 'high',
//   compatibility: { children: true, otherDogs: true, cats: true },
//   weight: { lbs: { min: 55, max: 75 }, kgs: { min: 25, max: 34 } }
// }
```

---

### Filter Functions

#### `getDogsByCountry(country: string): DogBreedData[]`

Find all breeds from a specific country.

```js
const germanDogs = getDogsByCountry('Germany');
// ['Affenpinscher', 'German Shepherd Dog', ...]

const ukDogs = getDogsByCountry('England');
// 20+ breeds
```

---

#### `getDogsBySize(size: string): DogBreedData[]`

Filter by size: `'small'` | `'medium'` | `'large'`

```js
getDogsBySize('small').length;   // 50+ small breeds
getDogsBySize('large').length;   // 80+ large breeds
getDogsBySize('medium').length;  // 200+ medium breeds
```

---

#### `getDogsByTemperament(trait: string): DogBreedData[]`

Find breeds with specific personality traits.

```js
const friendlyDogs = getDogsByTemperament('friendly');
console.log(friendlyDogs.length); // 100+ breeds

const loyalDogs = getDogsByTemperament('loyal');
// ['Akbash', 'Canaan Dog', 'German Shepherd Dog', ...]
```

---

#### `getDogsByEnergyLevel(level: string): DogBreedData[]`

Filter by energy: `'low'` | `'medium'` | `'high'`

```js
const highEnergy = getDogsByEnergyLevel('high');
console.log(highEnergy.length); // 200+ high-energy breeds

const lowEnergy = getDogsByEnergyLevel('low');
// ['Great Dane', 'Mastiff', 'Pug', ...]
```

---

#### `getDogsByTrainability(level: string): DogBreedData[]`

Filter by trainability: `'low'` | `'moderate'` | `'high'`

```js
const easyToTrain = getDogsByTrainability('high');
console.log(easyToTrain.length); // 100+ easy-to-train breeds

const hardToTrain = getDogsByTrainability('low');
// ['Afghan Hound', 'Saluki', ...]
```

---

#### `getDogsByShedding(level: string): DogBreedData[]`

Filter by shedding: `'minimal'` | `'moderate'` | `'heavy'`

```js
const lowShedding = getDogsByShedding('minimal');
// Great for allergy sufferers!

const heavyShedding = getDogsByShedding('heavy');
console.log(heavyShedding.length); // 150+ heavy shedders
```

---

#### `getDogsByGroomingNeeds(level: string): DogBreedData[]`

Filter by grooming: `'low'` | `'moderate'` | `'high'`

```js
const lowMaintenance = getDogsByGroomingNeeds('low');
console.log(lowMaintenance.length); // 100+ low-maintenance breeds

const highMaintenance = getDogsByGroomingNeeds('high');
// ['Affenpinscher', 'Afghan Hound', ...]
```

---

#### `getDogsByCompatibility(key: string, value: boolean): DogBreedData[]`

Find compatible breeds: `'children'` | `'otherDogs'` | `'cats'`

```js
// Kid-friendly dogs
getDogsByCompatibility('children', true).length;  // 300+ breeds

// Cat-friendly dogs
getDogsByCompatibility('cats', true).length;      // 200+ breeds

// Multi-dog households
getDogsByCompatibility('otherDogs', true).length; // 250+ breeds
```

---

#### `getDogsByWeightRange(min: number, max: number, unit?: string): DogBreedData[]`

Filter by weight with flexible unit support.

**Features:**
- 🔄 Auto-sorts weight values (handles `getDogsByWeightRange(50, 30)` gracefully)
- 📊 Multiple unit aliases supported:
  - Pounds: `'lbs'`, `'lb'`, `'pounds'`, `'pound'` (default)
  - Kilograms: `'kgs'`, `'kg'`, `'kilograms'`, `'kilos'`, `'kilo'`
- 🔤 Case-insensitive unit matching

```js
// Equivalent - all return 173 breeds
getDogsByWeightRange(30, 40);           // Standard
getDogsByWeightRange(40, 30);           // Auto-sorts to (30, 40)
getDogsByWeightRange(30, 40, 'pounds'); // Unit alias
getDogsByWeightRange(30, 40, 'lb');     // Short form

// Kilograms
getDogsByWeightRange(14, 18, 'kgs');       // 173 breeds
getDogsByWeightRange(14, 18, 'kilograms'); // Same result

// Apartment dogs (under 20 lbs)
getDogsByWeightRange(0, 20).length; // 119 breeds

// Giants (over 100 lbs)
getDogsByWeightRange(100, 300).map(d => d.name);
// ['Great Dane', 'Saint Bernard', ...]
```

---

### Advanced Functions

#### `fuzzySearchBreeds(searchTerm: string, maxDistance?: number): DogBreedData[]`

Typo-tolerant breed search using Levenshtein distance.

**Features:**
- 🔍 Partial matches prioritized
- 📏 Configurable fuzzy matching tolerance
- 🎯 Results sorted by relevance

```js
// Search for "Labrador"
fuzzySearchBreeds('Labrador');
// ['Labrador Retriever', ...]

// Searches work with "shepherd"
fuzzySearchBreeds('shepherd');
// ['German Shepherd', 'Australian Shepherd', ...]

// Typos still work! "daschund" → "Dachshund"
fuzzySearchBreeds('daschund', 3);
// ['Dachshund']

// Misspelled "Retriver" still finds retrievers
fuzzySearchBreeds('retriver');
// ['Golden Retriever', 'Labrador Retriever', ...]

// Strict mode: only exact substrings
fuzzySearchBreeds('Poodle', 0);
// ['Poodle', 'Standard Poodle', 'Toy Poodle', ...]
```

---

#### `compareBreeds(breed1: string, breed2: string): BreedComparison`

Side-by-side breed comparison with match indicators.

```js
compareBreeds('Golden Retriever', 'Labrador Retriever');
// Returns:
// {
//   breed1: { name: 'Golden Retriever', ... full data ... },
//   breed2: { name: 'Labrador Retriever', ... full data ... },
//   comparison: {
//     size: { breed1: 'large', breed2: 'large', match: true },
//     energyLevel: { breed1: 'high', breed2: 'high', match: true },
//     trainability: { breed1: 'high', breed2: 'high', match: true },
//     shedding: { breed1: 'heavy', breed2: 'heavy', match: true },
//     groomingNeeds: { breed1: 'high', breed2: 'moderate', match: false },
//     compatibility: {
//       children: { breed1: true, breed2: true, match: true },
//       otherDogs: { breed1: true, breed2: true, match: true },
//       cats: { breed1: true, breed2: true, match: true }
//     },
//     weight: { ... weight data for both ... }
//   }
// }

// Small breed comparison
compareBreeds('Chihuahua', 'Pomeranian');

// Extreme difference comparison
compareBreeds('Chihuahua', 'Great Dane');
```

---

#### `getRecommendedBreeds(preferences?: RecommendationPreferences): DogBreedData[]`

Get personalized breed recommendations based on multiple criteria.

**Preference Options:**

```ts
{
  size?: 'small' | 'medium' | 'large',
  energyLevel?: 'low' | 'medium' | 'high',
  trainability?: 'low' | 'moderate' | 'high',
  shedding?: 'minimal' | 'moderate' | 'heavy',
  groomingNeeds?: 'low' | 'moderate' | 'high',
  origin?: string,
  compatibility?: {
    children?: boolean,
    otherDogs?: boolean,
    cats?: boolean
  },
  weightRange?: {
    min: number,
    max: number,
    unit?: 'lbs' | 'kg' | 'kgs' | 'kilograms' | 'kilos' | ...
  },
  minLifespan?: number
}
```

**Examples:**

```js
// 👨‍👩‍👧‍👦 Family dog: small, trainable, kid-friendly
getRecommendedBreeds({
  size: 'small',
  trainability: 'high',
  compatibility: { children: true }
});
// ['Poodle', 'Papillon', 'Sheltie', ...]

// 🏢 Apartment dog: low energy, minimal shedding, under 25 lbs
getRecommendedBreeds({
  energyLevel: 'low',
  shedding: 'minimal',
  weightRange: { min: 0, max: 25 }
});
// 20+ recommendations

// 🏃 Active lifestyle: high energy, large, multi-dog friendly
getRecommendedBreeds({
  energyLevel: 'high',
  size: 'large',
  compatibility: { otherDogs: true }
});
// ['Golden Retriever', 'Australian Shepherd', ...]

// 🐱🐕 Multi-pet household: cat & dog friendly, low shedding
getRecommendedBreeds({
  compatibility: {
    cats: true,
    otherDogs: true
  },
  shedding: 'minimal'
});
// 30+ breed recommendations

// 🇫🇷 European family dog: French origin, large, kid-friendly
getRecommendedBreeds({
  origin: 'France',
  size: 'large',
  compatibility: { children: true }
});
// 5+ breeds

// 🎯 Perfect family companion (all criteria)
getRecommendedBreeds({
  size: 'medium',
  energyLevel: 'medium',
  trainability: 'high',
  shedding: 'moderate',
  groomingNeeds: 'moderate',
  compatibility: { children: true, otherDogs: true, cats: true },
  minLifespan: 10
});
// ['Golden Retriever', 'Labrador Retriever', 'Beagle', ...]
```

---

## 📊 Data Completeness

All 514 dog breeds include complete data:

| Property | Coverage | Notes |
|----------|----------|-------|
| Name | 100% | Official breed name |
| Origin | 100% | Country/region of origin |
| Size | 100% | small, medium, large |
| Temperament | 100% | 2-5 personality traits |
| Energy Level | 100% | low, medium, high |
| Trainability | 100% | low, moderate, high |
| Shedding | 100% | minimal, moderate, heavy |
| Lifespan | 100% | Years range (e.g., "10-12 years") |
| Grooming Needs | 100% | low, moderate, high |
| Compatibility | 100% | children, otherDogs, cats (true/false) |
| Weight | 100% | lbs and kgs with min/max |

---

## 🛠️ TypeScript Support

Full TypeScript definitions included:

```ts
import {
  isValidDogBreed,
  getDogBreedData,
  getDogsByEnergyLevel,
  DogBreedData,
  BreedComparison,
  RecommendationPreferences,
  NonEmptyStringError
} from 'validog';

// Full type safety
const dogs: DogBreedData[] = getDogsByEnergyLevel('high');
const prefs: RecommendationPreferences = {
  size: 'small',
  energyLevel: 'low'
};
```

---

## ⚠️ Error Handling

### `NonEmptyStringError`

A custom error class thrown when string parameters are empty or contain only whitespace.

**Features:**
- Extends `TypeError` for compatibility with standard error handling
- Includes helpful error messages
- Provides `fieldName` property for programmatic handling

**Example:**

```js
const { getDogsBySize, NonEmptyStringError } = require('validog');

// Catch and handle empty string errors
try {
  getDogsBySize('');  // ❌ Empty string
} catch (error) {
  if (error instanceof NonEmptyStringError) {
    console.error(`Validation Error: ${error.message}`);
    console.error(`Field: ${error.fieldName}`);
  }
}

// Output:
// Validation Error: Size cannot be empty. Please provide a non-empty string.
// Field: Size
```

**Common error scenarios:**

```js
const { isValidDogBreed, NonEmptyStringError } = require('validog');

// ❌ Empty string
try {
  isValidDogBreed('');
} catch (e) {
  // NonEmptyStringError: Breed name cannot be empty. Please provide a non-empty string.
}

// ❌ Only whitespace
try {
  isValidDogBreed('   ');
} catch (e) {
  // NonEmptyStringError: Breed name cannot be empty. Please provide a non-empty string.
}

// ❌ Not a string
try {
  isValidDogBreed(null);
} catch (e) {
  // TypeError: Breed name must be a string
}

// ✅ Valid string
isValidDogBreed('Labrador'); // true - no error thrown
```

**Functions that throw `NonEmptyStringError`:**
- `isValidDogBreed(breed)`
- `getDogBreedOrigin(breed)`
- `getDogBreedData(breed)`
- `getDogsByCountry(country)`
- `getDogsBySize(size)`
- `getDogsByTemperament(trait)`
- `getDogsByEnergyLevel(level)`
- `getDogsByTrainability(level)`
- `getDogsByShedding(level)`
- `getDogsByGroomingNeeds(level)`
- `fuzzySearchBreeds(searchTerm)`
- `compareBreeds(breed1, breed2)`

---

## 📝 License

MIT

---

## 💡 Need Help?

Check the examples above for common use cases. All functions include:
- ✅ Input validation
- ✅ Helpful error messages
- ✅ Flexible parameter handling
- ✅ Comprehensive TypeScript types

