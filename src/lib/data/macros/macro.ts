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
	}
});

export class Macro {
	private oldExpr?: string;

	private _node?: Node;
	public get node() {
		if (!this._node || this.expr !== this.oldExpr) {
			this._node = parse(this.expr);
			this.oldExpr = this.expr;
		}

		return this._node;
	}

	eval(char: Character) {
		return calculateNode(this.node, char);
	}

	constructor(public expr: string) {}
}
