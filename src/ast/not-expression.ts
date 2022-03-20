import { Token } from "typescript-parsec"
import { TokenType } from "../lexer"
import ExpressionNode from "./expression"
import Node from "./node"

type ParsedNot = [
	Token<TokenType.NotOperator>,
	ExpressionNode
]

export default class NotExpressionNode extends Node<ParsedNot, ExpressionNode> {
	parse([_, child]: ParsedNot) {
		return child
	}
}
