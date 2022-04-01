import { Token } from "typescript-parsec"
import { TokenType } from "../lexer.js"
import Node from "./node.js"
import TermNode from "./term.js"

type ParsedEqual = [
	Token<TokenType.EqualOperator>,
	TermNode
]

export default class EqualsExpressionNode extends Node<ParsedEqual, {right: TermNode}> {
	parse([_, right]: ParsedEqual) {
		return { right }
	}
}
