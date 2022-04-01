import { Token } from "typescript-parsec";
import { TokenType } from "../lexer.js";
import Node from "./node.js";

export default class IdentifierNode extends Node<Token<TokenType.Identifier>, string> {
	parse(id: Token<TokenType.Identifier>) {
		return id.text
	}
}
