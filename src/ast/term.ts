import DottedAccessNode from "./dotted-access"
import GroupedExpressionNode from "./grouped-expression"
import Node from "./node"
import NotExpressionNode from "./not-expression"
import NumberNode from "./number"
import StringNode from "./string"

type TermType =
| DottedAccessNode
| GroupedExpressionNode
| NotExpressionNode
| StringNode
| NumberNode

export default class TermNode extends Node<TermType, TermType> {
	parse(value: TermType) {
		return value
	}
}
