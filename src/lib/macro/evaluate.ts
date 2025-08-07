import { AstNodeType, type AstNode } from './ast';

function evalAttribute(path: string[], char: object): number {
	try {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const val: unknown = path.reduce((c, p) => c[p], char as Record<string, any>);

		switch (typeof val) {
			case 'number':
				return val;
			default:
				return NaN;
		}
	} catch (_err) {
		return NaN;
	}
}

function evalUnary(op: '+' | '-', value: number): number {
	return op === '+' ? value : -value;
}

function evalBinary(op: '+' | '-' | '*' | '/' | '%', left: number, right: number): number {
	switch (op) {
		case '+':
			return left + right;
		case '-':
			return left - right;
		case '*':
			return left * right;
		case '/':
			return left / right;
		case '%':
			return left % right;
	}
}

function evalFunc(
	func: 'floor' | 'round' | 'ceil' | 'min' | 'max' | 'clamp' | 'abs' | 'step',
	values: number[],
): number {
	switch (func) {
		case 'floor':
			return Math.floor(values[0]);
		case 'round':
			return Math.round(values[0]);
		case 'ceil':
			return Math.ceil(values[0]);
		case 'min':
			return Math.min(...values);
		case 'max':
			return Math.max(...values);
		case 'clamp':
			return Math.min(Math.max(values[0], values[1]), values[2]);
		case 'abs':
			return Math.abs(values[0]);
		case 'step':
			return values[0] < values[1] ? 0 : 1;
	}
}

export function evalNode(node: AstNode, char: object): number {
	switch (node.type) {
		case AstNodeType.Error:
			return NaN;
		case AstNodeType.Constant:
			return node.constant;
		case AstNodeType.Attribute:
			return evalAttribute(node.path, char);
		case AstNodeType.Unary:
			return evalUnary(node.op, evalNode(node.node, char));
		case AstNodeType.Binary:
			return evalBinary(node.op, evalNode(node.left, char), evalNode(node.right, char));
		case AstNodeType.Func:
			return evalFunc(
				node.func,
				node.nodes.map((n) => evalNode(n, char)),
			);
	}
}
