import { alt, apply, buildLexer, list_sc, lrec_sc, Parser, rep_sc, rule, seq, tok, Token } from "typescript-parsec"
import AndExpressionNode from "./ast/and-expression"
import BlockNode from "./ast/block"
import DottedAccessNode from "./ast/dotted-access"
import EqualsExpressionNode from "./ast/equals-expression"
import ExpressionNode from "./ast/expression"
import GroupedExpressionNode from "./ast/grouped-expression"
import IdentifierNode from "./ast/identifier"
import IfStatementNode from "./ast/if-statement"
import MatchExpressionNode from "./ast/match-expression"
import Node from "./ast/node"
import OrExpressionNode from "./ast/or-expression"
import SetStatementNode from "./ast/set-statement"
import StatementNode from "./ast/statement"
import StringNode from "./ast/string"
import SubroutineNode from "./ast/subroutine"
import TermNode from "./ast/term"
import { TokenType } from "./lexer"

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

const andExpressionParser = applyNode(
	AndExpressionNode,
	seq(
		tok(TokenType.AndOperator),
		term
	)
)

const orExpressionParser = applyNode(
	OrExpressionNode,
	seq(
		tok(TokenType.OrOperator),
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
			andExpressionParser,
			orExpressionParser,
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

const statement = rule<TokenType, StatementNode>()

const statementListParser = rep_sc(statement)

const blockParser = applyNode(
	BlockNode,
	seq(
		tok(TokenType.LeftBrace),
		statementListParser,
		tok(TokenType.RightBrace),
	)
)

const ifStatementParser = applyNode(
	IfStatementNode,
	seq(
		tok(TokenType.If),
		groupedExpressionParser,
		blockParser
	)
)

const subroutineParser = applyNode(
	SubroutineNode,
	seq(
		tok(TokenType.Sub),
		identifierParser,
		blockParser
	)
)

statement.setPattern(
	applyNode(
		StatementNode,
		alt(
			ifStatementParser,
			setStatementParser,
			subroutineParser
		)
	)
)

export const parser = statementListParser
export {default as lexer} from './lexer'
