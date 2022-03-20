import { Token } from "typescript-parsec";
import { TokenType } from "../lexer";
import BlockNode from "./block";
import IdentifierNode from "./identifier";
import Node from "./node";

type ParsedSub = [
	Token<TokenType.Sub>,
	IdentifierNode,
	BlockNode
]

export default class SubroutineNode extends Node<ParsedSub, { name: IdentifierNode, body: BlockNode }> {
	parse([_, name, body]: ParsedSub) {
		return { name, body }
	}
}
