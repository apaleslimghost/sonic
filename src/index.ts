import { alt, apply, buildLexer, list_sc, lrec_sc, rep_sc, rule, seq, tok, Token } from "typescript-parsec"

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
	| TermType

class ExpressionNode extends Node<ExpressionType, ExpressionType> {
	parse(value: ExpressionType) {
		return value
	}
}

type ParsedGroup = [
	Token<TokenType.LeftParen>,
	ExpressionType,
	Token<TokenType.RightParen>
]

class GroupedExpressionNode extends Node<ParsedGroup, ExpressionType> {
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

const term = rule<TokenType, TermType>()
const expression = rule<TokenType, ExpressionType>()

const groupedExpressionParser = apply(
	seq(
		tok(TokenType.LeftParen),
		expression,
		tok(TokenType.RightParen)
	),
	applyNode(GroupedExpressionNode)
)

const equalsExpressionParser = seq(
	tok(TokenType.EqualOperator),
	term
)

term.setPattern(
	alt(
		dottedExpressionParser,
		groupedExpressionParser
	),
)

expression.setPattern(
	lrec_sc(
		term,
		equalsExpressionParser,
		(...args) => {
			console.log(args)
			return args[0]
		}
	)
)

export const parser = expression
