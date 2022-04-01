import { Token } from "typescript-parsec"
import { TokenType } from "../lexer.js"
import BlockNode from "./block.js"
import ExpressionNode from "./expression.js"
import GroupedExpressionNode from "./grouped-expression.js"
import Node, { TraverseCallback } from "./node.js"

type ParsedIf = [
	Token<TokenType.If>,
	GroupedExpressionNode,
	BlockNode
]

export default class IfNode extends Node<ParsedIf, { condition: ExpressionNode, body: BlockNode }> {
	parse([_, conditionGroup, body]: ParsedIf) {
		return {condition: conditionGroup.value, body}
	}

	async traverse(callback: TraverseCallback) {
		await super.traverse(callback)
		await this.value.condition.traverse(callback)
		await this.value.body.traverse(callback)
	}
}
