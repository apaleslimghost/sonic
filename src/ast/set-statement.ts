import { Token } from "typescript-parsec"
import { TokenType } from "../lexer"
import DottedAccessNode from "./dotted-access"
import ExpressionNode from "./expression"
import Node from "./node"

type ParsedSet = [
	Token<TokenType.Set>,
	DottedAccessNode,
	Token<TokenType.AssignOperator>,
	ExpressionNode,
	Token<TokenType.Semicolon>
]

export default class SetStatementNode extends Node<ParsedSet, { name: DottedAccessNode, value: ExpressionNode }> {
	parse([_, name, __, value, ___]: ParsedSet) {
		return {name, value}
	}
}
