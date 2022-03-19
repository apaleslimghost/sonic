import IfStatementNode from "./if-statement"
import Node from "./node"
import SetStatementNode from "./set-statement"

type StatementType =
	| IfStatementNode
	| SetStatementNode

export default class StatementNode extends Node<StatementType, StatementType> {
	parse(statement: StatementType) {
		return statement
	}
}
