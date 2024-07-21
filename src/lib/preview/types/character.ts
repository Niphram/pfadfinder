export type CharacterBase = {
	readonly id: string;
	readonly system: string;
	readonly version: number;
	name: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CharacterMigrationFn = (data: any) => any;
