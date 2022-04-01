import { Token } from "typescript-parsec";
import { TokenType } from "../lexer.js";
import Node from "./node.js";
import StringNode from "./string.js";

type ParsedInclude = [
	Token<TokenType.Include>,
	StringNode,
	Token<TokenType.Semicolon>
]

export default class IncludeStatementNode extends Node<ParsedInclude, { path: string }> {
	parse([_, pathString]: ParsedInclude) {
		return {
			path: pathString.value
		}
	}
}
