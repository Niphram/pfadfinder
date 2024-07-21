import type { ComponentType, SvelteComponent } from 'svelte';
import type { CharacterBase, CharacterMigrationFn } from './character';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SystemData<C extends CharacterBase = any> = {
	character: new () => C;
	migrations: CharacterMigrationFn[];
	page: ComponentType<SvelteComponent<{ character: C }>>;
};
