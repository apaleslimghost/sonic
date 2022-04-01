import AndExpressionNode from "./and-expression.js"
import EqualsExpressionNode from "./equals-expression.js"
import MatchExpressionNode from "./match-expression.js"
import Node from "./node.js"
import NotEqualsExpressionNode from "./not-equals-expression.js"
import OrExpressionNode from "./or-expression.js"
import TermNode from "./term.js"

type ExpressionTail =
	| EqualsExpressionNode
	| NotEqualsExpressionNode
	| AndExpressionNode
	| OrExpressionNode
	| MatchExpressionNode

type ExpressionType = {
	head: TermNode,
	tail?: ExpressionTail
}

export default class ExpressionNode extends Node<ExpressionType, ExpressionType> {
	parse(value: ExpressionType) {
		return value
	}
}
