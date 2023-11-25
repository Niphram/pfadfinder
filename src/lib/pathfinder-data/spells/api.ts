import type { Spell } from './spell';

export class SpellsAPI {
	static async list() {
		const response = await fetch('/data/spells.json');
		const spells = (await response.json()) as { name: string; description: string }[];

		return spells;
	}

	static async getSpell(name: string) {
		const response = await fetch(`/data/spells/${encodeURIComponent(name)}.json`);
		const spell = (await response.json()) as Spell;

		return spell;
	}
}
