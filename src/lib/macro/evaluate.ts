import type { ICharacter } from '$lib/state';
import { NodeType, type Node, parse } from './parser';

function calcAttribute(path: string[], char: ICharacter): number {
	try {
		const val: unknown = path.reduce((c, p) => c[p], char as Record<string, any>);

		switch (typeof val) {
			case 'number':
				return val;
			case 'string':
				return calculateNode(parse(val), char);
			default:
				return NaN;
		}
	} catch (err) {
		return NaN;
	}
}

function calcUnary(op: '+' | '-', value: number): number {
	return op === '+' ? value : -value;
}

function calcBinary(op: '+' | '-' | '*' | '/' | '%', left: number, right: number): number {
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

function calcFunc(func: undefined | 'floor' | 'round' | 'ceil', value: number): number {
	switch (func) {
		case undefined:
			return value;
		case 'floor':
			return Math.floor(value);
		case 'round':
			return Math.round(value);
		case 'ceil':
			return Math.ceil(value);
	}
}

export function calculateNode(node: Node, char: ICharacter): number {
	switch (node.type) {
		case NodeType.Error:
			return NaN;
		case NodeType.Constant:
			return node.constant;
		case NodeType.Attribute:
			return calcAttribute(node.path, char);
		case NodeType.Unary:
			return calcUnary(node.op, calculateNode(node.node, char));
		case NodeType.Binary:
			return calcBinary(node.op, calculateNode(node.left, char), calculateNode(node.right, char));
		case NodeType.Func:
			return calcFunc(node.func, calculateNode(node.node, char));
	}
}

export function printNode(node: Node, char: ICharacter): string {
	switch (node.type) {
		case NodeType.Error:
			return '[ERR]';
		case NodeType.Constant:
			return node.constant.toString();
		case NodeType.Attribute:
			return `${node.path.join('.')} [${calcAttribute(node.path, char)}]`;
		case NodeType.Unary:
			return `${node.op}${printNode(node.node, char)}`;
		case NodeType.Binary:
			return `${printNode(node.left, char)} ${node.op} ${printNode(node.right, char)}`;
		case NodeType.Func:
			return `${node.func ?? ''}( ${printNode(node.node, char)} )`;
	}
}
