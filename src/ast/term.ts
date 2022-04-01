import DottedAccessNode from "./dotted-access.js"
import GroupedExpressionNode from "./grouped-expression.js"
import Node from "./node.js"
import NotEqualsExpressionNode from "./not-equals-expression.js"
import NotExpressionNode from "./not-expression.js"
import NumberNode from "./number.js"
import StringNode from "./string.js"

type TermType =
| DottedAccessNode
| GroupedExpressionNode
| NotExpressionNode
| NotEqualsExpressionNode
| StringNode
| NumberNode

export default class TermNode extends Node<TermType, TermType> {
	parse(value: TermType) {
		return value
	}

	*[Symbol.iterator]():IterableIterator<Node<unknown, unknown>> {
		yield* this.value
	}
}
