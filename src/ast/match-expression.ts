import { Token } from "typescript-parsec"
import { TokenType } from "../lexer"
import Node from "./node"
import TermNode from "./term"

type ParsedMatch = [
	Token<TokenType.MatchOperator>,
	TermNode
]

export default class MatchExpressionNode extends Node<ParsedMatch, {right: TermNode}> {
	parse([_, right]: ParsedMatch) {
		return { right }
	}
}
