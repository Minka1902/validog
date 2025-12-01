export class NonEmptyStringError extends TypeError {
    constructor(fieldName: string);
    readonly name: 'NonEmptyStringError';
    readonly fieldName: string;
}

export function isValidDogBreed(breed: string): boolean;
export function getDogBreedOrigin(breed: string): string | null;
export function getDogBreedData(breed: string, options?: { fuzzy?: boolean; lang?: string }): DogBreedData | null;
export function getDogsByCountry(country: string): DogBreedData[];
export function getDogsBySize(size: string): DogBreedData[];
export function getDogsByTemperament(trait: string): DogBreedData[];
export function getDogsByEnergyLevel(level: string): DogBreedData[];
export function getDogsByTrainability(level: string): DogBreedData[];
export function getDogsByShedding(level: string): DogBreedData[];
export function getDogsByGroomingNeeds(level: string): DogBreedData[];
export function getDogsByCompatibility(key: 'children' | 'otherDogs' | 'cats', value: boolean): DogBreedData[];
export function getDogsByWeightRange(min: number, max: number, unit?: 'lbs' | 'lb' | 'kgs' | 'kg' | 'pounds' | 'pound' | 'kilograms' | 'kilos' | 'kilo'): DogBreedData[];
export function fuzzySearchBreeds(searchTerm: string, maxDistance?: number): DogBreedData[];
export function compareBreeds(breed1: string, breed2: string): BreedComparison;
export function getRecommendedBreeds(preferences?: RecommendationPreferences): DogBreedData[];

export interface DogBreedData {
    name: string;
    origin: string;
    size?: string;
    temperament?: string[];
    energyLevel?: string;
    trainability?: string;
    shedding?: string;
    lifespan?: string;
    groomingNeeds?: string;
    compatibility?: {
        children?: boolean;
        otherDogs?: boolean;
        cats?: boolean;
    };
    weight?: {
        lbs?: { min: number; max: number };
        kgs?: { min: number; max: number };
    };
    names?: { [lang: string]: string };
}

export interface BreedComparison {
    breed1: DogBreedData;
    breed2: DogBreedData;
    comparison: {
        size: { breed1: string; breed2: string; match: boolean };
        energyLevel: { breed1: string; breed2: string; match: boolean };
        trainability: { breed1: string; breed2: string; match: boolean };
        shedding: { breed1: string; breed2: string; match: boolean };
        lifespan: { breed1: string; breed2: string; match: boolean };
        groomingNeeds: { breed1: string; breed2: string; match: boolean };
        origin: { breed1: string; breed2: string; match: boolean };
        compatibility: {
            breed1: any;
            breed2: any;
            children: { breed1: boolean; breed2: boolean; match: boolean };
            otherDogs: { breed1: boolean; breed2: boolean; match: boolean };
            cats: { breed1: boolean; breed2: boolean; match: boolean };
        };
        weight: { breed1: any; breed2: any };
    };
}

export interface RecommendationPreferences {
    size?: 'small' | 'medium' | 'large';
    energyLevel?: 'low' | 'medium' | 'high';
    trainability?: 'low' | 'moderate' | 'high';
    shedding?: 'minimal' | 'moderate' | 'heavy';
    groomingNeeds?: 'low' | 'moderate' | 'high';
    origin?: string;
    compatibility?: {
        children?: boolean;
        otherDogs?: boolean;
        cats?: boolean;
    };
    weightRange?: {
        min: number;
        max: number;
        unit?: 'lbs' | 'kgs';
    };
    minLifespan?: number;
}