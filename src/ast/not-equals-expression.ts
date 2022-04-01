import { Token } from "typescript-parsec"
import { TokenType } from "../lexer.js"
import Node from "./node.js"
import TermNode from "./term.js"

type ParsedNotEqual = [
	Token<TokenType.NotEqualOperator>,
	TermNode
]

export default class NotEqualsExpressionNode extends Node<ParsedNotEqual, {right: TermNode}> {
	parse([_, right]: ParsedNotEqual) {
		return { right }
	}

	*[Symbol.iterator](): IterableIterator<Node<unknown, unknown>> {
		yield this
		yield* this.value.right
	}
}
