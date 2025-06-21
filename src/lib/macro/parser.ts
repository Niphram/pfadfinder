import {
	alt,
	alt_sc,
	apply,
	expectEOF,
	expectSingleResult,
	kmid,
	kright,
	list,
	list_sc,
	lrec_sc,
	opt,
	rule,
	seq,
	str,
	tok,
	type Token as ParsecToken,
	type Parser,
} from 'typescript-parsec';

import { TokenKind, tokenize } from './tokenizer';

type Token = ParsecToken<TokenKind>;

export enum NodeType {
	Error,
	Constant,
	Attribute,
	Unary,
	Binary,
	Func,
}

export type Node = ErrorNode | ConstantNode | AttributeNode | UnaryNode | BinaryNode | FuncNode;

type ErrorNode = {
	type: NodeType.Error;
	message: string;
};

type ConstantNode = {
	type: NodeType.Constant;
	constant: number;
};

type AttributeNode = {
	type: NodeType.Attribute;
	path: string[];
};

type UnaryNode = {
	type: NodeType.Unary;
	op: '+' | '-';
	node: Node;
};

type BinaryNode = {
	type: NodeType.Binary;
	op: '+' | '-' | '*' | '/' | '%';
	left: Node;
	right: Node;
};

type FuncNode = {
	type: NodeType.Func;
	func?: 'floor' | 'round' | 'ceil' | 'min' | 'max' | 'clamp' | 'abs' | 'step';
	nodes: Node[];
};

function applyConstant(token: Token): ConstantNode {
	return {
		type: NodeType.Constant,
		constant: Number.parseInt(token.text),
	};
}

function applyAttribute(tokens: Token[]): AttributeNode {
	return {
		type: NodeType.Attribute,
		path: tokens.map((t) => t.text),
	};
}

function applyUnary([op, node]: [Token, Node]): UnaryNode {
	switch (op.text) {
		case '+':
		case '-':
			return {
				type: NodeType.Unary,
				op: op.text,
				node,
			};
		default:
			throw new Error(`Unknown unary operator: ${op.text}`);
	}
}

function applyBinary(left: Node, [token, right]: [Token, Node]): BinaryNode {
	switch (token.text) {
		case '+':
		case '-':
		case '*':
		case '/':
		case '%':
			return {
				type: NodeType.Binary,
				op: token.text,
				left,
				right,
			};
		default:
			throw new Error(`Unknown binary operator: ${token.text}`);
	}
}

function applyFunc([func, nodes]: [Token | undefined, Node[]]): FuncNode {
	switch (func?.text) {
		case undefined:
		case 'floor':
		case 'round':
		case 'ceil':
		case 'abs':
			if (nodes.length !== 1)
				throw new Error(`Function ${func?.text} expected 1 argument, got ${nodes.length}`);
			break;

		case 'min':
		case 'max':
			break;

		case 'clamp':
			if (nodes.length !== 3)
				throw new Error(`Function ${func?.text} expected 3 argument, got ${nodes.length}`);
			break;

		case 'step':
			if (nodes.length !== 2)
				throw new Error(`Function ${func?.text} expected 2 argument, got ${nodes.length}`);
			break;

		default:
			throw new Error(`Unknown function type: ${func?.text}`);
	}

	return {
		type: NodeType.Func,
		func: func?.text,
		nodes,
	};
}

/**
 * Parsers
 */
const TERM = rule<TokenKind, Node>();
const FACTOR = rule<TokenKind, Node>();
const EXP = rule<TokenKind, Node>();

/**
 * CONSTANT = { "0" - "9" }
 */
const constantParser = apply(tok(TokenKind.Number), applyConstant);

/**
 * ATTRIBUTE = "@" STRING [ { "." STRING } ]
 */
const attributeParser = apply(
	kright(
		tok(TokenKind.At),
		list_sc(alt_sc(tok(TokenKind.String), tok(TokenKind.Number)), tok(TokenKind.Period)),
	),
	applyAttribute,
);

/**
 * UNARY = ( "+" | "-" ) TERM
 */
const unaryParser: Parser<TokenKind, UnaryNode> = apply(
	seq(alt(str('+'), str('-')), TERM),
	applyUnary,
);

/**
 * FUNC = [ "floor" | "round" | "ceil" | "min" | "max" | "clamp" | "abs" ] "(" EXPR ["," EXPR]* ")"
 */
const funcParser = apply(
	seq(opt(tok(TokenKind.String)), kmid(str('('), list(EXP, tok(TokenKind.Comma)), str(')'))),
	applyFunc,
);

/**
 * TERM = CONSTANT | ATTRIBUTE | UNARY | FUNC
 */
TERM.setPattern(alt(constantParser, attributeParser, unaryParser, funcParser));

/**
 * FACTOR = TERM | ( FACTOR ( "*" | "/" ) TERM )
 */
FACTOR.setPattern(lrec_sc(TERM, seq(alt(str('*'), str('/')), TERM), applyBinary));

/**
 * EXP = FACTOR | ( EXP ( "+" | "-" ) FACTOR )
 */
EXP.setPattern(lrec_sc(FACTOR, seq(alt(str('+'), str('-')), FACTOR), applyBinary));

export function parse(expr: string): Node {
	try {
		return expectSingleResult(expectEOF(EXP.parse(tokenize(expr))));
	} catch (_err) {
		return {
			type: NodeType.Error,
			message: `Could not parse input: ${expr}`,
		};
	}
}
