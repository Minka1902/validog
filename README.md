# validog
A simple Javascript and Typescript package to check if a string is a valid dog breed and get breed information.

## Installation
```
npm install is-valid
```

## Usage
```js
const { isValidDogBreed, getDogBreedOrigin, getDogBreedData } = require('is-valid');

console.log(isValidDogBreed('Labrador Retriever')); // true
console.log(isValidDogBreed('Unknown Breed')); // false

console.log(getDogBreedOrigin('Labrador Retriever')); // "Canada, United Kingdom (England)"

console.log(getDogBreedData('Affenpinscher'));
// {
//   name: 'Affenpinscher',
//   origin: 'Germany, France',
//   size: 'small',
//   temperament: ['confident', 'curious']
// }
```

## API
### isValidDogBreed(breed: string, options?): boolean
Returns true if the input string is a valid dog breed, false otherwise.
- Input is normalized (case-insensitive, trimmed)
- Returns false for non-string input
- Supports fuzzy/partial matching and multi-language names

### getDogBreedOrigin(breed: string, options?): string | null
Returns the country/region of origin for a breed, or null if not found.

### getDogBreedData(breed: string, options?): DogBreedData | null
Returns all available data for a breed (name, origin, size, temperament, etc.), or null if not found.
