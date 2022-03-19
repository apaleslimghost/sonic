import EqualsExpressionNode from "./equals-expression"
import MatchExpressionNode from "./match-expression"
import Node from "./node"
import TermNode from "./term"

type ExpressionTail =
	| EqualsExpressionNode
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
