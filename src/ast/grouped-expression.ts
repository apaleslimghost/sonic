import { Token } from "typescript-parsec"
import { TokenType } from "../lexer.js"
import ExpressionNode from "./expression.js"
import Node from "./node.js"

type ParsedGroup = [
	Token<TokenType.LeftParen>,
	ExpressionNode,
	Token<TokenType.RightParen>
]

export default class GroupedExpressionNode extends Node<ParsedGroup, ExpressionNode> {
	parse([_, child, __]: ParsedGroup) {
		return child
	}

	*[Symbol.iterator](): IterableIterator<Node<unknown, unknown>> {
		yield* this.value
	}
}
