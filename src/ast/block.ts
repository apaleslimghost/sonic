import { Token } from "typescript-parsec"
import { TokenType } from "../lexer.js"
import Node from "./node.js"
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
}
