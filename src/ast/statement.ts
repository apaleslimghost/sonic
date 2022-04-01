import IfStatementNode from "./if-statement.js"
import Node from "./node.js"
import ReturnStatementNode from "./return-statement.js"
import SetStatementNode from "./set-statement.js"
import SubroutineNode from "./subroutine.js"

type StatementType =
	| IfStatementNode
	| ReturnStatementNode
	| SubroutineNode
	| SetStatementNode

export default class StatementNode extends Node<StatementType, StatementType> {
	parse(statement: StatementType) {
		return statement
	}

	*[Symbol.iterator](): IterableIterator<Node<unknown, unknown>> {
		yield this
		yield* this.value
	}
}
