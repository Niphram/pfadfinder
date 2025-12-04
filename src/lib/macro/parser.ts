import { iteratorResultToResult } from '$lib/utils';

import {
	AstNodeType,
	type AstNode,
	type AttributeNode,
	type BinaryNode,
	type ConstantNode,
	type FuncNode,
	type UnaryNode,
} from './ast';
import { BINARY_OPERATORS, type BinaryOperator } from './constants';
import type { ParserError } from './errors';
import { Tokenizer, TokenType, type Token } from './tokenizer';

// Precedence-Values, higher values have more precedence
const enum Precedence {
	DEFAULT = 0,
	ADDITIVE,
	MULTIPLICATIVE,
	EXPONENTIATION,
	UNARY,
}

function parserError(
	message: string,
	fromToken?: Token,
	toToken?: Token,
): ParserError {
	const from = fromToken?.from ?? 0;
	const to = toToken?.to ?? fromToken?.to ?? 0;

	return {
		message,
		from,
		to,
	};
}

export class Parser {
	private tokenIterator: Generator<Token, undefined>;
	private lookahead: Token | undefined;

	private constructor(input: string) {
		this.tokenIterator = new Tokenizer(input)[Symbol.iterator]();
	}

	public static parse(input: string) {
		const parser = new Parser(input);

		// The generator will either yield an error or return the ast
		return iteratorResultToResult(parser.init().next());
	}

	private *init(): Generator<ParserError, AstNode> {
		this.lookahead = this.tokenIterator.next().value;

		const result = yield* this.Expression();

		if (this.lookahead) {
			return yield parserError(
				`Unexpected Token: ${this.lookahead.value}`,
				this.lookahead,
			);
		}

		return result;
	}

	private getOperatorPrecedence(op: BinaryOperator | string) {
		switch (op) {
			case '**':
				return Precedence.EXPONENTIATION;
			case '*':
			case '/':
			case '%':
			case '//':
				return Precedence.MULTIPLICATIVE;

			case '+':
			case '-':
				return Precedence.ADDITIVE;
		}

		return Precedence.DEFAULT;
	}

	// Expect a particular token, consume it, and move to the next token
	private *consume(tokenType: TokenType): Generator<ParserError, Token> {
		const token = this.lookahead;

		if (!token) {
			return yield parserError(
				`Unexpected end of input, expected "${tokenType}".`,
			);
		}

		if (token.type !== tokenType) {
			return yield parserError(
				`Unexpected token: "${token.value}", expected "${tokenType}".`,
				token,
			);
		}

		// Advance to the next token
		this.lookahead = this.tokenIterator.next().value;

		return token;
	}

	// Try to consume the expected token, but don't fail otherwise
	private *consumeOpt(
		tokenType: TokenType,
	): Generator<ParserError, Token | undefined> {
		if (this.lookahead?.type !== tokenType) return undefined;

		return yield* this.consume(tokenType);
	}

	// Try each expected token and consume the first matching one
	private *consumeOneOf(
		...tokenTypes: TokenType[]
	): Generator<ParserError, Token> {
		if (!this.lookahead) {
			return yield parserError(
				`Unexpected end of input, expected one of "${tokenTypes.join(', ')}".`,
			);
		}

		for (const tokenType of tokenTypes) {
			const token = yield* this.consumeOpt(tokenType);
			if (token) return token;
		}

		return yield parserError(
			`Unexpected token: "${this.lookahead.value}", expected "${tokenTypes.join(', ')}".`,
			this.lookahead,
		);
	}

	/**
	 * Expression
	 *    = Prefix (Infix)*
	 */
	private *Expression(
		prec: Precedence = Precedence.DEFAULT,
	): Generator<ParserError, AstNode> {
		let left = yield* this.Prefix();

		while (
			this.lookahead &&
			prec < this.getOperatorPrecedence(this.lookahead.value)
		) {
			left = yield* this.Infix(left, this.lookahead.type);
		}

		return left;
	}

	/**
	 * CommaSeperatedExpressions
	 *    = Expression ("," Expression)*
	 */
	private *CommaSeperatedExpressions(): Generator<ParserError, AstNode[]> {
		const expressions = [];

		do {
			expressions.push(yield* this.Expression());
		} while (yield* this.consumeOpt(TokenType.COMMA));

		return expressions;
	}

	/**
	 * Prefix
	 *    = ParenthesizedExpression
	 *    / UnaryExpression
	 * 	  / Attribute
	 *    / FunctionExpression
	 *    / NUMBER
	 */
	private *Prefix(): Generator<ParserError, AstNode> {
		if (!this.lookahead) {
			return yield parserError(
				`Unexpected end of input, expected a valid expression.`,
			);
		}

		switch (this.lookahead?.type) {
			case TokenType.PARENTHESIS_LEFT:
				return yield* this.ParenthesizedExpression();
			case TokenType.IDENTIFIER:
				return yield* this.Function();
			case TokenType.OPERATOR:
				return yield* this.UnaryExpression();
			case TokenType.INTEGER:
			case TokenType.DECIMAL:
				return yield* this.Constant();
			case TokenType.AT:
				return yield* this.Attribute();
		}

		return yield parserError(
			`Unexpected Token: "${this.lookahead?.value}".`,
			this.lookahead,
		);
	}

	/**
	 * Infix
	 *    = ("+" / "-" / "*" / "/" / "%" / "//" / "**") Expression
	 */
	private *Infix(
		left: AstNode,
		operatorType: TokenType,
	): Generator<ParserError, BinaryNode> {
		const token = yield* this.consume(operatorType);
		const newPrec = this.getOperatorPrecedence(token.value);

		switch (token.value) {
			case '+':
			case '-':
			case '*':
			case '/':
			case '%':
			case '//':
			case '**':
				return {
					type: AstNodeType.Binary,
					op: token.value,
					left,
					right: yield* this.Expression(newPrec),
					from: token.from,
					to: token.to,
				};

			default:
				return yield parserError(
					`Unexpected Operator: "${token.value}". Valid operators are ${BINARY_OPERATORS.join(' ')}.`,
					token,
				);
		}
	}

	/**
	 * ParenthesizedExpression
	 *    = "(" Expression ")"
	 */
	private *ParenthesizedExpression(): Generator<ParserError, AstNode> {
		yield* this.consume(TokenType.PARENTHESIS_LEFT);
		const node = yield* this.Expression();
		yield* this.consume(TokenType.PARENTHESIS_RIGHT);

		return node;
	}

	/**
	 * UnaryExpression
	 *    = "-" | "+" Expression
	 */
	private *UnaryExpression(): Generator<ParserError, UnaryNode> {
		const token = yield* this.consume(TokenType.OPERATOR);

		switch (token.value) {
			case '+':
			case '-':
				return {
					type: AstNodeType.Unary,
					op: token.value,
					node: yield* this.Expression(Precedence.UNARY),
					from: token.from,
					to: token.to,
				};

			default:
				return yield parserError(
					`Unexpected Token: "${token.value}", expected "+" or "-".`,
					token,
				);
		}
	}

	/**
	 * Constant
	 *    = INTEGER
	 *    / DECIMAL
	 */
	private *Constant(): Generator<ParserError, ConstantNode> {
		const token = yield* this.consumeOneOf(
			TokenType.INTEGER,
			TokenType.DECIMAL,
		);

		return {
			type: AstNodeType.Constant,
			constant: Number(token.value),
			from: token.from,
			to: token.to,
		};
	}

	/**
	 * FunctionExpression
	 *    = "@" (Identifier / INTEGER ) ("." (Identifier / INTEGER))*
	 */
	private *Attribute(): Generator<ParserError, AttributeNode> {
		const atToken = yield* this.consume(TokenType.AT);

		const path: string[] = [];

		let endToken = atToken;
		do {
			endToken = yield* this.consumeOneOf(
				TokenType.IDENTIFIER,
				TokenType.INTEGER,
			);
			path.push(endToken.value);
		} while (yield* this.consumeOpt(TokenType.PERIOD));

		return {
			type: AstNodeType.Attribute,
			path,
			from: atToken.from,
			to: endToken.to,
		};
	}

	/**
	 * Consumes an identifier and tries to match it to a valid function
	 * @returns function name and expected argument count (or undefined if count doesn't matter)
	 */
	private *FunctionNameAndArgsCount(): Generator<
		ParserError,
		[func: FuncNode['func'], expectedArgs: number | undefined, fromToken: Token]
	> {
		const token = yield* this.consume(TokenType.IDENTIFIER);

		switch (token.value) {
			case 'floor':
			case 'round':
			case 'ceil':
			case 'abs':
				return [token.value, 1, token];
			case 'min':
			case 'max':
				return [token.value, undefined, token];
			case 'clamp':
				return [token.value, 3, token];
			case 'step':
				return [token.value, 2, token];
		}

		return yield parserError(`Invalid function: "${token.value}".`, token);
	}

	/**
	 * FunctionExpression
	 *    = "floor" "(" Expression ")"
	 * 	  / "round" "(" Expression ")"
	 * 	  / "ceil" "(" Expression ")"
	 * 	  / "abs" "(" Expression ")"
	 * 	  / "min" "(" Expression ("," Expression)* ")"
	 * 	  / "max" "(" Expression ("," Expression)* ")"
	 * 	  / "clamp" "(" Expression "," Expression "," Expression ")"
	 * 	  / "step" "(" Expression "," Expression ")"
	 */
	private *Function(): Generator<ParserError, FuncNode> {
		const [func, expectedArgs, fromToken] =
			yield* this.FunctionNameAndArgsCount();
		const lParenthesisToken = yield* this.consume(TokenType.PARENTHESIS_LEFT);
		const nodes = yield* this.CommaSeperatedExpressions();

		if (expectedArgs && nodes.length !== expectedArgs) {
			return yield parserError(
				`Function "${func}" expected ${expectedArgs} argument, got ${nodes.length}.`,
				lParenthesisToken,
				this.lookahead,
			);
		}

		const rParenthesisToken = yield* this.consume(TokenType.PARENTHESIS_RIGHT);

		return {
			type: AstNodeType.Func,
			func,
			nodes,
			from: fromToken.from,
			to: rParenthesisToken.to,
		};
	}
}
