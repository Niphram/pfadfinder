import { PathfinderSystem } from './pathfinder';

export const SYSTEMS_MAP = {
	pathfinder: new PathfinderSystem(),
};

export function isValidSystem(key: string): key is keyof typeof SYSTEMS_MAP {
	return key in SYSTEMS_MAP;
}
