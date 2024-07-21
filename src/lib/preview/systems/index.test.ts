import { describe, expect, it } from 'vitest';

import { SYSTEM_MAP } from '.';

describe('Systems', () => {
	const systems = Object.entries(SYSTEM_MAP);

	for (const [system, { character, migrations }] of systems) {
		describe(system, () => {
			it('character system should be correct', () => {
				expect(new character().system).toBe(system);
			});

			it('character version should match migrations', () => {
				expect(new character().version).toBe(migrations.length);
			});

			it('should be random', () => {
				const charA = new character();
				const charB = new character();

				expect(charA.id).not.toBe(charB.id);
			});
		});
	}
});
