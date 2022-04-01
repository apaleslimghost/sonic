import IfStatementNode from "./if-statement.js"
import Node, { TraverseCallback } from "./node.js"
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

	async traverse(callback: TraverseCallback) {
		await super.traverse(callback)
		await this.value.traverse(callback)
	}
}
