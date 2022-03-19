import { Token } from "typescript-parsec";
import { TokenType } from "../lexer";
import Node from "./node";

export default class IdentifierNode extends Node<Token<TokenType.Identifier>, string> {
	parse(id: Token<TokenType.Identifier>) {
		return id.text
	}
}
