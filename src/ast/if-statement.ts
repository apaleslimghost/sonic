import { Token } from "typescript-parsec"
import ElseNode from "./else.js"
import IfNode from "./if.js"
import Node, { TraverseCallback } from "./node.js"

type ParsedIfStatement = [
	IfNode,
	ElseNode[]
]

export default class IfStatementNode extends Node<ParsedIfStatement, { if: IfNode, elses: ElseNode[] }> {
	parse([if_, elses]: ParsedIfStatement) {
		return {if: if_, elses}
	}

	async traverse(callback: TraverseCallback) {
		await super.traverse(callback)
		await this.value.if.traverse(callback)

		for(const node of this.value.elses) {
			await node.traverse(callback)
		}
	}
}
