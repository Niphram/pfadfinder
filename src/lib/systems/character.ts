import { nanoid } from 'nanoid';

import { ClassSerializer, number, string } from '$lib/serde';

import type { SYSTEMS_MAP } from '.';

export abstract class BaseCharacter extends ClassSerializer {
	readonly id = string(nanoid());

	readonly name = string('Unnamed Character', { minLength: 1, maxLength: 100 });

	readonly system;

	readonly version;

	abstract get description(): string;

	constructor(system: keyof typeof SYSTEMS_MAP, version: number) {
		super();

		this.version = number(version);
		this.system = string(system);
	}
}
