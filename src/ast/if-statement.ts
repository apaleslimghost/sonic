import { Token } from "typescript-parsec"
import ElseNode from "./else.js"
import IfNode from "./if.js"
import Node from "./node.js"

type ParsedIfStatement = [
	IfNode,
	ElseNode[]
]

export default class IfStatementNode extends Node<ParsedIfStatement, { if: IfNode, elses: ElseNode[] }> {
	parse([if_, elses]: ParsedIfStatement) {
		return {if: if_, elses}
	}
}
