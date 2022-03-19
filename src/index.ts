import { alt, apply, buildLexer, list_sc, lrec_sc, Parser, rep_sc, rule, seq, tok, Token } from "typescript-parsec"

enum TokenType {
	StringLiteral,
	Whitespace,
	EqualOperator,
	MatchOperator,
	Identifier,
	Dot,
	LeftParen,
	RightParen,
	Set,
	AssignOperator,
	Semicolon
}

export const lexer = buildLexer([
	[true, /^set/g, TokenType.Set],
	[true, /^[A-Za-z_-]+/g, TokenType.Identifier],
	[true, /^\./g, TokenType.Dot],
	[true, /^=/g, TokenType.AssignOperator],
	[true, /^==/g, TokenType.EqualOperator],
	[true, /^~/g, TokenType.MatchOperator],
	[true, /^"([^"\n])*"/g, TokenType.StringLiteral],
	[true, /^\(/g, TokenType.LeftParen],
	[true, /^\)/g, TokenType.RightParen],
	[true, /^;/g, TokenType.Semicolon],
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

class DottedAccessNode extends Node<IdentifierNode[], IdentifierNode[]> {
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

type ParsedMatch = [
	Token<TokenType.MatchOperator>,
	TermNode
]

class MatchExpressionNode extends Node<ParsedMatch, {right: TermNode}> {
	parse([_, right]: ParsedMatch) {
		return { right }
	}
}

type ExpressionTail =
	| EqualsExpressionNode
	| MatchExpressionNode

type ExpressionType = {
	head: TermNode,
	tail?: ExpressionTail
}

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
	| DottedAccessNode
	| GroupedExpressionNode

class TermNode extends Node<TermType, TermType> {
	parse(value: TermType) {
		return value
	}
}

type ParsedSet = [
	Token<TokenType.Set>,
	DottedAccessNode,
	Token<TokenType.AssignOperator>,
	ExpressionNode,
	Token<TokenType.Semicolon>
]

class SetStatementNode extends Node<ParsedSet, { name: DottedAccessNode, value: ExpressionNode }> {
	parse([_, name, __, value, ___]: ParsedSet) {
		return {name, value}
	}
}

const nodeApplier = <V, T>(nodeType: new (value: V) => Node<V, T>) => (value: V) => new nodeType(value)

const applyNode = <K, V, T>(
	nodeType: new (value: V) => Node<V, T>,
	parser: Parser<K, V>
) => apply(
	parser,
	nodeApplier(nodeType)
)

const stringParser = applyNode(
	StringNode,
	tok(TokenType.StringLiteral),
)

const identifierParser = applyNode(
	IdentifierNode,
	tok(TokenType.Identifier),
)

const dottedAccessParser = applyNode(
	DottedAccessNode,
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

const matchExpressionParser = applyNode(
	MatchExpressionNode,
	seq(
		tok(TokenType.MatchOperator),
		term
	)
)

term.setPattern(
	applyNode(
		TermNode,
		alt(
			dottedAccessParser,
			stringParser,
			groupedExpressionParser,
		)
	)
)

expression.setPattern(
	lrec_sc(
		applyNode(ExpressionNode, apply(term, head => ({ head }))),
		alt(
			equalsExpressionParser,
			matchExpressionParser
		),
		(head, tail) => new ExpressionNode({ head: head.value.head, tail })
	)
)

const setStatementParser = applyNode(
	SetStatementNode,
	seq(
		tok(TokenType.Set),
		dottedAccessParser,
		tok(TokenType.AssignOperator),
		expression,
		tok(TokenType.Semicolon)
	)
)

export const parser = setStatementParser
