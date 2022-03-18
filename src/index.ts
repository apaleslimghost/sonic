import { apply, buildLexer, list_sc, rep_sc, seq, tok, Token } from "typescript-parsec"

enum TokenType {

	StringLiteral,
	Whitespace,
	EqualOperator,
	Identifier,
	Dot
}

export const lexer = buildLexer([
	[true, /^[A-Za-z_-]+/g, TokenType.Identifier],
	[true, /^\./g, TokenType.Dot],
	[true, /^==/g, TokenType.EqualOperator],
	[true, /^"([^"\n])*"/g, TokenType.StringLiteral],
	[false, /^\s+/g, TokenType.Whitespace],
])

class Node<V, T> {
	value: T

	constructor(value: V) {
		this.value = this.parse(value)
	}

	parse(value: V): T {
		return null
	}
}

class StringNode extends Node<Token<TokenType.StringLiteral>, string> {
	parse(string: Token<TokenType.StringLiteral>): string {
		return string.text.slice(1, -1)
	}
}

class DottedExpressionNode extends Node<IdentifierNode[], IdentifierNode[]> {
	parse(parts: IdentifierNode[]) {
		return parts
	}
}

class IdentifierNode extends Node<Token<TokenType.Identifier>, string> {
	parse(id: Token<TokenType.Identifier>) {
		return id.text
	}
}

const applyNode = <V, T>(nodeType: new (value: V) => Node<V, T>) =>
	(value: V) =>
		new nodeType(value)

const stringParser = apply(
	tok(TokenType.StringLiteral),
	applyNode(StringNode)
)

const identifierParser = apply(
	tok(TokenType.Identifier),
	applyNode(IdentifierNode)
)

const dottedExpressionParser = apply(
	list_sc(
		identifierParser,
		tok(TokenType.Dot)
	),
	applyNode(DottedExpressionNode)
)

export const parser = dottedExpressionParser
