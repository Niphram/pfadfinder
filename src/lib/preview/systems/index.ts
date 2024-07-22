import { KidsOnBikes } from './kids-on-bikes';
import { Pathfinder } from './pathfinder';
import type { SystemData } from './system';

export const SYSTEM_MAP = {
	pathfinder: Pathfinder,
	'kids-on-bikes': KidsOnBikes
} satisfies Record<string, SystemData>;

export type SystemName = keyof typeof SYSTEM_MAP;
