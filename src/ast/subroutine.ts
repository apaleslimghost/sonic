import { Token } from "typescript-parsec";
import { TokenType } from "../lexer.js";
import BlockNode from "./block.js";
import IdentifierNode from "./identifier.js";
import Node from "./node.js";

type ParsedSub = [
	Token<TokenType.Sub>,
	IdentifierNode,
	BlockNode
]

export default class SubroutineNode extends Node<ParsedSub, { name: IdentifierNode, body: BlockNode }> {
	parse([_, name, body]: ParsedSub) {
		return { name, body }
	}

	*[Symbol.iterator](): IterableIterator<Node<unknown, unknown>> {
		yield this
		yield* this.value.body
	}
}
