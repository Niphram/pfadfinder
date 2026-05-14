import { describe, test, vi } from 'vitest';

import { charProxy } from '$lib/serde';
import { SYSTEMS_MAP } from '$lib/systems';

// Mock nanoid so generated ids are stable across runs
vi.mock('nanoid', () => ({
	nanoid: () => 'static-test-id',
}));

const testFiles = import.meta.glob<{ system: keyof typeof SYSTEMS_MAP }>(
	'./*.json',
);

// Snapshot testing for character files
// Allows manual review if the data model changes

describe('Character Snapshot Tests', async () => {
	for (const filename in testFiles) {
		test(filename, async ({ expect }) => {
			const serialized = await testFiles[filename]();

			const deserialized =
				SYSTEMS_MAP[serialized.system].upgradeCharacterAndDeserialize(
					serialized,
				);

			expect(charProxy(deserialized)).toMatchSnapshot();
		});
	}
});
