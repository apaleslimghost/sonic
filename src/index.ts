import { alt, apply, buildLexer, list_sc, lrec_sc, Parser, rep_sc, rule, seq, tok, Token } from "typescript-parsec"

enum TokenType {
	StringLiteral,
	Whitespace,
	EqualOperator,
	MatchOperator,
	Identifier,
	Dot,
	LeftParen,
	RightParen
}

export const lexer = buildLexer([
	[true, /^[A-Za-z_-]+/g, TokenType.Identifier],
	[true, /^\./g, TokenType.Dot],
	[true, /^==/g, TokenType.EqualOperator],
	[true, /^~/g, TokenType.MatchOperator],
	[true, /^"([^"\n])*"/g, TokenType.StringLiteral],
	[true, /^\(/g, TokenType.LeftParen],
	[true, /^\)/g, TokenType.RightParen],
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

type ParsedEqual = [
	Token<TokenType.EqualOperator>,
	TermNode
]

class EqualsExpressionNode extends Node<ParsedEqual, {right: TermNode}> {
	parse([_, right]: ParsedEqual) {
		return { right }
	}
}

type ExpressionType =
	| EqualsExpressionNode
	| TermNode

class ExpressionNode extends Node<ExpressionType, ExpressionType> {
	parse(value: ExpressionType) {
		return value
	}
}

type ParsedGroup = [
	Token<TokenType.LeftParen>,
	ExpressionNode,
	Token<TokenType.RightParen>
]

class GroupedExpressionNode extends Node<ParsedGroup, ExpressionNode> {
	parse([_, child, __]: ParsedGroup) {
		return child
	}
}

type TermType =
	| DottedExpressionNode
	| GroupedExpressionNode

class TermNode extends Node<TermType, TermType> {
	parse(value: TermType) {
		return value
	}
}

const applyNode = <K, V, T>(
	nodeType: new (value: V) => Node<V, T>,
	parser: Parser<K, V>
) => apply(
	parser,
	(value: V) => new nodeType(value)
)

const stringParser = applyNode(
	StringNode,
	tok(TokenType.StringLiteral),
)

const identifierParser = applyNode(
	IdentifierNode,
	tok(TokenType.Identifier),
)

const dottedExpressionParser = applyNode(
	DottedExpressionNode,
	list_sc(
		identifierParser,
		tok(TokenType.Dot)
	)
)

const term = rule<TokenType, TermNode>()
const expression = rule<TokenType, ExpressionNode>()

const groupedExpressionParser = applyNode(
	GroupedExpressionNode,
	seq(
		tok(TokenType.LeftParen),
		expression,
		tok(TokenType.RightParen)
	)
)

const equalsExpressionParser = applyNode(
	EqualsExpressionNode,
	seq(
		tok(TokenType.EqualOperator),
		term
	)
)

term.setPattern(
	applyNode(
		TermNode,
		alt(
			dottedExpressionParser,
			groupedExpressionParser
		)
	)
)

// expression.setPattern(
// 	lrec_sc(
// 		apply(term, applyNode(ExpressionNode)),
// 		equalsExpressionParser,

// 	)
// )

export const parser = expression
