import { Token } from "typescript-parsec"
import { TokenType } from "../lexer"
import Node from "./node"
import TermNode from "./term"

type ParsedNotEqual = [
	Token<TokenType.NotEqualOperator>,
	TermNode
]

export default class NotEqualsExpressionNode extends Node<ParsedNotEqual, {right: TermNode}> {
	parse([_, right]: ParsedNotEqual) {
		return { right }
	}
}
