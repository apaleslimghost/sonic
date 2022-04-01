import { Token } from "typescript-parsec";
import { TokenType } from "../lexer.js";
import TermNode from "./term.js";
import Node from "./node.js";

type ParsedAnd = [
	Token<TokenType.AndOperator>,
	TermNode
]

export default class AndExpressionNode extends Node<ParsedAnd, { right: TermNode }> {
	parse([_, right]: ParsedAnd) {
		return { right }
	}

	*[Symbol.iterator](): IterableIterator<Node<unknown, unknown>> {
		yield this
		yield* this.value.right
	}
}
