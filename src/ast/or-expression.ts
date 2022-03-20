import { Token } from "typescript-parsec";
import { TokenType } from "../lexer";
import TermNode from "./term";
import Node from "./node";

type ParsedOr = [
	Token<TokenType.OrOperator>,
	TermNode
]

export default class OrExpressionNode extends Node<ParsedOr, { right: TermNode }> {
	parse([_, right]: ParsedOr) {
		return { right }
	}
}
