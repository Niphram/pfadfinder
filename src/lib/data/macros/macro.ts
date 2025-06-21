import { calculateNode } from '$lib/macro/evaluate';
import { parse, type Node } from '$lib/macro/parser';
import { autoserializeAs } from 'cerialize';
import type { Character } from '../character';

export const macro = autoserializeAs({
	Serialize(instance: Macro): string {
		return instance.expr;
	},

	Deserialize(expr: string): Macro {
		return new Macro(expr);
	},
});

export class Macro<C = Character> {
	private oldExpr?: string;

	private _node?: Node;
	public get node() {
		if (!this._node || this.expr !== this.oldExpr) {
			this._node = parse(this.expr);
			this.oldExpr = this.expr;
		}

		return this._node;
	}

	eval(char: C) {
		return calculateNode(this.node, char as Character); // TODO
	}

	constructor(public expr: string) {}
}
