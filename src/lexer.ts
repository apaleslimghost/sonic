import { buildLexer } from "typescript-parsec";

export enum TokenType {
	StringLiteral,
	Whitespace,
	EqualOperator,
	MatchOperator,
	Identifier,
	Dot,
	LeftParen,
	RightParen,
	LeftBrace,
	RightBrace,
	Set,
	If,
	AssignOperator,
	Semicolon,
	Comment,
	Sub
}

const lexer = buildLexer([
	[true, /^set/g, TokenType.Set],
	[true, /^if/g, TokenType.If],
	[true, /^sub/g, TokenType.Sub],
	[true, /^[A-Za-z_-]+/g, TokenType.Identifier],
	[true, /^\./g, TokenType.Dot],
	[true, /^=/g, TokenType.AssignOperator],
	[true, /^==/g, TokenType.EqualOperator],
	[true, /^~/g, TokenType.MatchOperator],
	[true, /^"([^"\n])*"/g, TokenType.StringLiteral],
	[true, /^\(/g, TokenType.LeftParen],
	[true, /^\)/g, TokenType.RightParen],
	[true, /^\{/g, TokenType.LeftBrace],
	[true, /^\}/g, TokenType.RightBrace],
	[true, /^;/g, TokenType.Semicolon],
	[false, /^#.+\n/g, TokenType.Comment],
	[false, /^\s+/g, TokenType.Whitespace],
])

export default lexer
