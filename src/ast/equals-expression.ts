import { Token } from "typescript-parsec"
import { TokenType } from "../lexer"
import Node from "./node"
import TermNode from "./term"

type ParsedEqual = [
	Token<TokenType.EqualOperator>,
	TermNode
]

export default class EqualsExpressionNode extends Node<ParsedEqual, {right: TermNode}> {
	parse([_, right]: ParsedEqual) {
		return { right }
	}
}
