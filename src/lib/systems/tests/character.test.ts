import { glob, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, test } from 'vitest';

import { charProxy } from '$lib/serde';
import { SYSTEMS_MAP } from '$lib/systems';

// Serializer to remove "id" from objects
expect.addSnapshotSerializer({
	test(val) {
		return (
			// oxlint-disable-next-line typescript/strict-boolean-expressions
			val
			&& Object.prototype.hasOwnProperty.call(val, 'id')
			&& typeof val.id === 'string'
		);
	},
	serialize(val, config, indentation, depth, refs, printer) {
		delete val.id;
		return printer(val, config, indentation, depth, refs);
	},
});

const testFiles = glob('*.json', { cwd: import.meta.dirname });

// Snapshot testing for character files
// Allows manual review if the data model changes

describe('Character Snapshot Tests', async () => {
	for await (const file of testFiles) {
		test(file, async () => {
			const content = (
				await readFile(resolve(import.meta.dirname, file))
			).toString();

			const parsed = JSON.parse(content) as { system: string };

			expect(SYSTEMS_MAP).toHaveProperty(parsed.system);

			const newChar =
				SYSTEMS_MAP[
					parsed.system as keyof typeof SYSTEMS_MAP
				].upgradeCharacterAndDeserialize(parsed);

			expect(charProxy(newChar)).toMatchSnapshot();
		});
	}
});
