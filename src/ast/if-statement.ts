import { Token } from "typescript-parsec"
import ElseNode from "./else"
import IfNode from "./if"
import Node from "./node"

type ParsedIfStatement = [
	IfNode,
	ElseNode[]
]

export default class IfStatementNode extends Node<ParsedIfStatement, { if: IfNode, elses: ElseNode[] }> {
	parse([if_, elses]: ParsedIfStatement) {
		return {if: if_, elses}
	}
}
