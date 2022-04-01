import { Token } from "typescript-parsec"
import { TokenType } from "../lexer.js"
import Node from "./node.js"
import TermNode from "./term.js"

type ParsedMatch = [
	Token<TokenType.MatchOperator>,
	TermNode
]

export default class MatchExpressionNode extends Node<ParsedMatch, {right: TermNode}> {
	parse([_, right]: ParsedMatch) {
		return { right }
	}
}
