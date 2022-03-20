import AndExpressionNode from "./and-expression"
import EqualsExpressionNode from "./equals-expression"
import MatchExpressionNode from "./match-expression"
import Node from "./node"
import NotEqualsExpressionNode from "./not-equals-expression"
import OrExpressionNode from "./or-expression"
import TermNode from "./term"

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
