import { autoserializeAs } from 'cerialize';

import type { AstNode } from '$lib/macro/ast';
import { evalNode } from '$lib/macro/evaluate';
import { Parser } from '$lib/macro/parser';

export const macro = autoserializeAs({
	Serialize(instance: Macro<object>): string {
		return instance.expr;
	},

	Deserialize(expr: string): Macro<object> {
		return new Macro(expr);
	},
});

export class Macro<C extends object = object> {
	private oldExpr?: string;

	private _node?: AstNode;
	public get node() {
		if (!this._node || this.expr !== this.oldExpr) {
			this._node = Parser.parse(this.expr);
			this.oldExpr = this.expr;
		}

		return this._node;
	}

	eval(char: C) {
		return evalNode(this.node, char);
	}

	constructor(public expr: string) {}
}
