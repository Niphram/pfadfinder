import { buildLexer } from 'typescript-parsec';

export enum TokenKind {
	Number,
	String,
	Op,
	Comma,
	At,
	LParen,
	RParen,
	Period,
	Space
}

const lexer = buildLexer([
	[true, /^\d+/g, TokenKind.Number],
	[true, /^[\w\d]+/g, TokenKind.String],
	[true, /^[+\-*%/]/g, TokenKind.Op],
	[true, /^,/g, TokenKind.Comma],
	[true, /^@/g, TokenKind.At],
	[true, /^\(/g, TokenKind.LParen],
	[true, /^\)/g, TokenKind.RParen],
	[true, /^\./g, TokenKind.Period],
	[false, /^\s+/g, TokenKind.Space]
]);

export function tokenize(input: string) {
	return lexer.parse(input);
}
