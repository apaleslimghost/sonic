import IfStatementNode from "./if-statement"
import Node from "./node"
import ReturnStatementNode from "./return-statement"
import SetStatementNode from "./set-statement"
import SubroutineNode from "./subroutine"

type StatementType =
	| IfStatementNode
	| ReturnStatementNode
	| SubroutineNode
	| SetStatementNode

export default class StatementNode extends Node<StatementType, StatementType> {
	parse(statement: StatementType) {
		return statement
	}
}
