import type { ISpell } from './types';
import { base } from '$app/paths';

export class SpellsAPI {
	static async list() {
		const response = await fetch(`${base}/data/spells.json`);
		const spells = (await response.json()) as { name: string; description: string }[];

		return spells;
	}

	static async getSpell(name: string) {
		const response = await fetch(`${base}/data/spells/${name}.json`);
		const spell = (await response.json()) as ISpell;

		return spell;
	}
}
