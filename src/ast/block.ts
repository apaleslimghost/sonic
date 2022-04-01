import { Token } from "typescript-parsec"
import { TokenType } from "../lexer.js"
import Node, { TraverseCallback } from "./node.js"
import StatementNode from "./statement.js"

type ParsedBlock = [
	Token<TokenType.LeftBrace>,
	StatementNode[],
	Token<TokenType.RightBrace>,
]

export default class BlockNode extends Node<ParsedBlock, StatementNode[]> {
	parse([_, body, __]: ParsedBlock) {
		return body
	}

	async traverse(callback: TraverseCallback) {
		super.traverse(callback)

		for(const node of this.value) {
			node.traverse(callback)
		}
	}
}
