import { Token } from "typescript-parsec"
import { TokenType } from "../lexer"
import Node from "./node"
import StatementNode from "./statement"

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
