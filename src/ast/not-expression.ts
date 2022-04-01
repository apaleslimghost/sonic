import { Token } from "typescript-parsec"
import { TokenType } from "../lexer.js"
import ExpressionNode from "./expression.js"
import Node from "./node.js"

type ParsedNot = [
	Token<TokenType.NotOperator>,
	ExpressionNode
]

export default class NotExpressionNode extends Node<ParsedNot, ExpressionNode> {
	parse([_, child]: ParsedNot) {
		return child
	}
}
