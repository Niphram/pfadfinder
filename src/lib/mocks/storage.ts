import type { IDBStorage } from '$lib/storage';

export const mockStorage: Omit<IDBStorage, 'db'> = {
	saveCharacter: async () => {},
	deleteCharacter: async () => {},
	getCharactersMetadata: async () => [],
	getCharacterById: async () => undefined,
	duplicateCharacterById: async () => {},
};
