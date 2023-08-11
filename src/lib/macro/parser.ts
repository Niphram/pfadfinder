import {
	alt,
	apply,
	kmid,
	kright,
	list_sc,
	lrec_sc,
	opt,
	rule,
	seq,
	str,
	tok,
	type Parser,
	type Token as ParsecToken,
	expectSingleResult,
	expectEOF
} from 'typescript-parsec';

import { TokenKind, tokenize } from './tokenizer';

type Token = ParsecToken<TokenKind>;

export enum NodeType {
	Error,
	Constant,
	Attribute,
	Unary,
	Binary,
	Func
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
	func?: 'floor' | 'round' | 'ceil';
	node: Node;
};

function applyConstant(token: Token): ConstantNode {
	return {
		type: NodeType.Constant,
		constant: Number.parseInt(token.text)
	};
}

function applyAttribute(tokens: Token[]): AttributeNode {
	return {
		type: NodeType.Attribute,
		path: tokens.map((t) => t.text)
	};
}

function applyUnary([op, node]: [Token, Node]): UnaryNode {
	switch (op.text) {
		case '+':
		case '-':
			return {
				type: NodeType.Unary,
				op: op.text,
				node
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
				right
			};
		default:
			throw new Error(`Unknown binary operator: ${token.text}`);
	}
}

function applyFunc([func, node]: [Token | undefined, Node]): FuncNode {
	switch (func?.text) {
		case undefined:
		case 'floor':
		case 'round':
		case 'ceil':
			return {
				type: NodeType.Func,
				func: func?.text,
				node
			};
		default:
			throw new Error(`Unknown function type: ${func?.text}`);
	}
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
	kright(tok(TokenKind.At), list_sc(tok(TokenKind.String), tok(TokenKind.Period))),
	applyAttribute
);

/**
 * UNARY = ( "+" | "-" ) TERM
 */
const unaryParser: Parser<TokenKind, UnaryNode> = apply(
	seq(alt(str('+'), str('-')), TERM),
	applyUnary
);

/**
 * FUNC = [ "floor" | "round" | "ceil" ] "(" EXPR ")"
 */
const funcParser = apply(seq(opt(tok(TokenKind.String)), kmid(str('('), EXP, str(')'))), applyFunc);

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
	} catch (err) {
		return {
			type: NodeType.Error,
			message: `Could not parse input: ${expr}`
		};
	}
}
