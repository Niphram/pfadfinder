export const enum TokenType {
	INVALID = 'INVALID',
	INTEGER = 'INTEGER',
	DECIMAL = 'DECIMAL',
	IDENTIFIER = 'IDENTIFIER',
	OPERATOR = 'OPERATOR',
	PARENTHESIS_LEFT = 'PARENTHESIS_LEFT',
	PARENTHESIS_RIGHT = 'PARENTHESIS_RIGHT',
	COMMA = 'COMMA',
	AT = 'AT',
	PERIOD = 'PERIOD',
}

const TokenSpec: [RegExp, TokenType | null][] = [
	// Whitespace
	[/^\s+/, null],

	[/^,/, TokenType.COMMA],
	[/^@/, TokenType.AT],
	[/^\./, TokenType.PERIOD], // Check for period before decimal

	[/^\d+\.\d+/, TokenType.DECIMAL], // Check for decimal before integer
	[/^\d+/, TokenType.INTEGER], // Check for integer before identifier
	[/^\w[\w\d]*/, TokenType.IDENTIFIER],

	[/^[+\-*/%]/, TokenType.OPERATOR],

	[/^\(/, TokenType.PARENTHESIS_LEFT],
	[/^\)/, TokenType.PARENTHESIS_RIGHT],
];

export type Token = {
	type: TokenType;
	value: string;
};

type TokenizerResult =
	| {
			ok: true;
			token: Token | undefined;
	  }
	| {
			ok: false;
			message: string;
	  };

export class Tokenizer {
	private cursor = 0;

	public constructor(public input: string) {}

	public hasMoreTokens() {
		return this.cursor < this.input.length;
	}

	public getNextToken(): TokenizerResult {
		if (!this.hasMoreTokens()) {
			return { ok: true, token: undefined };
		}

		const inputSlice = this.input.slice(this.cursor);

		for (const [regex, type] of TokenSpec) {
			const tokenValue = this.match(regex, inputSlice);

			// Rule didn't match, try next rule
			if (!tokenValue) {
				continue;
			}

			// Matched token is ignored, continue on
			if (!type) {
				return this.getNextToken();
			}

			return {
				ok: true,
				token: {
					type,
					value: tokenValue,
				},
			};
		}

		// Input could not be parsed, skip to end and return invalid token
		this.cursor = this.input.length;
		return {
			ok: true,
			token: {
				type: TokenType.INVALID,
				value: inputSlice[0],
			},
		};
	}

	/**
	 * Tries to match the regex against the input and advances the cursor on match
	 */
	private match(regex: RegExp, inputSlice: string) {
		const matched = regex.exec(inputSlice);
		if (matched === null) {
			return undefined;
		}

		this.cursor += matched[0].length;
		return matched[0];
	}

	public allTokens(): Token[] {
		const tokens: Token[] = [];

		let next: TokenizerResult;
		while ((next = this.getNextToken()).ok && next.token) {
			tokens.push(next.token);
		}

		return tokens;
	}
}
