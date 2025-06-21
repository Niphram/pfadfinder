export const enum TokenType {
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

export class Tokenizer {
	private cursor = 0;

	public constructor(public input: string) {}

	public hasMoreTokens() {
		return this.cursor < this.input.length;
	}

	public getNextToken(): { type: TokenType; value: string } | null {
		if (!this.hasMoreTokens()) {
			return null;
		}

		const inputSlice = this.input.slice(this.cursor);

		for (const [regex, type] of TokenSpec) {
			const tokenValue = this.match(regex, inputSlice);

			// Rule didn't match, try next rule
			if (tokenValue === null) {
				continue;
			}

			// Matched token is ignored, continue on
			if (type === null) {
				return this.getNextToken();
			}

			return {
				type,
				value: tokenValue,
			};
		}

		// Input could not be parsed
		throw new SyntaxError(`Unexpected token: "${inputSlice[0]}"`);
	}

	/**
	 * Tries to match the regex against the input and advances the cursor on match
	 */
	private match(regex: RegExp, inputSlice: string) {
		const matched = regex.exec(inputSlice);
		if (matched === null) {
			return null;
		}

		this.cursor += matched[0].length;
		return matched[0];
	}
}
