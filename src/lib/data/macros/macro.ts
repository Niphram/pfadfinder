import { calculateNode } from '$lib/macro/evaluate';
import { parse, type Node } from '$lib/macro/parser';
import { autoserializeAs } from 'cerialize';
import type { Character } from '../character';

export const macro = autoserializeAs({
	Serialize(instance: Macro): any {
		return instance.expr;
	},

	Deserialize(expr: any): any {
		return new Macro(expr);
	}
});

export class Macro {
	expr: string;

	private oldExpr?: string;

	private _node?: Node;
	private get node() {
		if (!this._node || this.expr !== this.oldExpr) {
			this._node = parse(this.expr);
			this.oldExpr = this.expr;
		}

		return this._node;
	}

	eval(char: Character) {
		return calculateNode(this.node, char);
	}

	constructor(expr: string) {
		this.expr = expr;
	}
}
