import DottedAccessNode from "./dotted-access"
import GroupedExpressionNode from "./grouped-expression"
import Node from "./node"

type TermType =
| DottedAccessNode
| GroupedExpressionNode

export default class TermNode extends Node<TermType, TermType> {
	parse(value: TermType) {
		return value
	}
}
