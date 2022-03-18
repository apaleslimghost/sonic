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

class Node<T> {
	value: T

	constructor(...args: Token<TokenType>[]) {
		this.value = this.parse(...args)
	}

	parse(...args: Token<TokenType>[]): T {
		return null
	}
}

class StringNode extends Node<string> {
	parse(
		_: Token<TokenType.Quote>,
		contents: Token<TokenType.StringContents>,
		__: Token<TokenType.Quote>
	): string {
		return contents.text
	}
}


const applyNode = <T>(nodeType: new (...args: Token<TokenType>[]) => Node<T>) =>
	(value: Token<TokenType>[]) =>
		new nodeType(...value)

const stringParser = apply(
	seq(
		tok(TokenType.Quote),
		tok(TokenType.StringContents),
		tok(TokenType.Quote)
	),
	applyNode(StringNode)
)

export const parser = stringParser
