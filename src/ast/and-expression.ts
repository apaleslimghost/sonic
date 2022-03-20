import { Token } from "typescript-parsec";
import { TokenType } from "../lexer";
import TermNode from "./term";
import Node from "./node";

type ParsedAnd = [
	Token<TokenType.AndOperator>,
	TermNode
]

export default class AndExpressionNode extends Node<ParsedAnd, { right: TermNode }> {
	parse([_, right]: ParsedAnd) {
		return { right }
	}
}
