import { Token } from "typescript-parsec"
import { TokenType } from "../lexer"
import ExpressionNode from "./expression"
import Node from "./node"

type ParsedGroup = [
	Token<TokenType.LeftParen>,
	ExpressionNode,
	Token<TokenType.RightParen>
]

export default class GroupedExpressionNode extends Node<ParsedGroup, ExpressionNode> {
	parse([_, child, __]: ParsedGroup) {
		return child
	}
}
