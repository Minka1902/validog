export function isValidDogBreed(breed: string): boolean;
export function getDogBreedOrigin(breed: string): string | null;
export interface DogBreedData {
    name: string;
    origin: string;
    size?: string;
    temperament?: string[];
    names?: { [lang: string]: string };
}

export function getDogBreedData(breed: string, options?: { fuzzy?: boolean; lang?: string }): DogBreedData | null;
