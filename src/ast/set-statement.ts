import { Token } from "typescript-parsec"
import { TokenType } from "../lexer.js"
import DottedAccessNode from "./dotted-access.js"
import ExpressionNode from "./expression.js"
import Node from "./node.js"

type ParsedSet = [
	Token<TokenType.Set>,
	DottedAccessNode,
	Token<TokenType.AssignOperator>,
	ExpressionNode,
	Token<TokenType.Semicolon>
]

export default class SetStatementNode extends Node<ParsedSet, { name: DottedAccessNode, value: ExpressionNode }> {
	parse([_, name, __, value, ___]: ParsedSet) {
		return {name, value}
	}

	*[Symbol.iterator](): IterableIterator<Node<unknown, unknown>> {
		yield this
		yield* this.value.value
	}
}
