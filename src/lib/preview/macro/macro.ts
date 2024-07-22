import { autoserializeAs } from 'cerialize';

import { calculateNode } from './evaluate';
import { parse, type Node } from './parser';

export const serializeMacro = autoserializeAs({
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
	private get node() {
		if (!this._node || this.expr !== this.oldExpr) {
			this._node = parse(this.expr);
			this.oldExpr = this.expr;
		}

		return this._node;
	}

	eval<C extends NonNullable<unknown>>(char: C) {
		return calculateNode(this.node, char);
	}

	constructor(public expr: string) {}
}
