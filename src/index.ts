import { apply, buildLexer, list_sc, rep_sc, seq, tok, Token } from "typescript-parsec"

enum TokenType {
	Quote,
	StringContents,
	Whitespace
}

export const lexer = buildLexer([
	[true, /^"/g, TokenType.Quote],
	[true, /^([^"\n])*/g, TokenType.StringContents],
	[false, /^\s+/g, TokenType.Whitespace]
])

const stringParser = apply(
	seq(
		tok(TokenType.Quote),
		tok(TokenType.StringContents),
		tok(TokenType.Quote)
	),
	value => value[1]
)

export const parser = stringParser
