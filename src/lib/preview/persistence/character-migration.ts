import type { CharacterBase, CharacterMigrationFn } from '../types/character';

export function migrateCharacter(data: CharacterBase & object, migrations: CharacterMigrationFn[]) {
	return migrations.slice(data.version).reduce((previousCharData, migrateFn, index) => {
		const migrated = migrateFn(previousCharData);
		migrated.version = index;
		return migrated;
	}, data);
}
