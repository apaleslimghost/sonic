import { Token } from "typescript-parsec";
import { TokenType } from "../lexer.js";
import TermNode from "./term.js";
import Node from "./node.js";

type ParsedOr = [
	Token<TokenType.OrOperator>,
	TermNode
]

export default class OrExpressionNode extends Node<ParsedOr, { right: TermNode }> {
	parse([_, right]: ParsedOr) {
		return { right }
	}
}
