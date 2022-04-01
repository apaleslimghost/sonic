import { alt, apply, buildLexer, list_sc, lrec_sc, opt_sc, Parser, rep_sc, rule, seq, tok, Token } from "typescript-parsec"
import AndExpressionNode from "./ast/and-expression.js"
import BlockNode from "./ast/block.js"
import DottedAccessNode from "./ast/dotted-access.js"
import ElseNode from "./ast/else.js"
import EqualsExpressionNode from "./ast/equals-expression.js"
import ExpressionNode from "./ast/expression.js"
import GroupedExpressionNode from "./ast/grouped-expression.js"
import IdentifierNode from "./ast/identifier.js"
import IfNode from "./ast/if.js"
import IfStatementNode from "./ast/if-statement.js"
import MatchExpressionNode from "./ast/match-expression.js"
import Node from "./ast/node.js"
import NotExpressionNode from "./ast/not-expression.js"
import NotEqualsExpressionNode from "./ast/not-equals-expression.js"
import OrExpressionNode from "./ast/or-expression.js"
import ReturnStatementNode from "./ast/return-statement.js"
import SetStatementNode from "./ast/set-statement.js"
import StatementNode from "./ast/statement.js"
import StringNode from "./ast/string.js"
import SubroutineNode from "./ast/subroutine.js"
import TermNode from "./ast/term.js"
import { TokenType } from "./lexer.js"
import NumberNode from "./ast/number.js"

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

const numberParser = applyNode(
	NumberNode,
	tok(TokenType.NumberLiteral)
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

const notExpressionParser = applyNode(
	NotExpressionNode,
	seq(
		tok(TokenType.NotOperator),
		expression
	)
)

const equalsExpressionParser = applyNode(
	EqualsExpressionNode,
	seq(
		tok(TokenType.EqualOperator),
		term
	)
)

const notEqualsExpressionParser = applyNode(
	NotEqualsExpressionNode,
	seq(
		tok(TokenType.NotEqualOperator),
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
			numberParser,
			groupedExpressionParser,
			notExpressionParser
		)
	)
)

expression.setPattern(
	lrec_sc(
		applyNode(ExpressionNode, apply(term, head => ({ head }))),
		alt(
			equalsExpressionParser,
			notEqualsExpressionParser,
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

const ifParser = applyNode(
	IfNode,
	seq(
		tok(TokenType.If),
		groupedExpressionParser,
		blockParser
	)
)

const elseParser = applyNode(
	ElseNode,
	seq(
		tok(TokenType.Else),
		alt(
			blockParser,
			ifParser
		)
	)
)

const ifStatementParser = applyNode(
	IfStatementNode,
	seq(
		ifParser,
		rep_sc(elseParser)
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

const returnStatementParser = applyNode(
	ReturnStatementNode,
	seq(
		tok(TokenType.Return),
		opt_sc(
			seq(
				tok(TokenType.LeftParen),
				tok(TokenType.ReturnJump),
				tok(TokenType.RightParen),
			)
		),
		tok(TokenType.Semicolon)
	)
)

statement.setPattern(
	applyNode(
		StatementNode,
		alt(
			ifStatementParser,
			setStatementParser,
			returnStatementParser,
			subroutineParser
		)
	)
)

export default statementListParser
