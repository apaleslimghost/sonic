import { Token } from "typescript-parsec"
import { TokenType } from "../lexer"
import BlockNode from "./block"
import ExpressionNode from "./expression"
import GroupedExpressionNode from "./grouped-expression"
import Node from "./node"

type ParsedIf = [
	Token<TokenType.If>,
	GroupedExpressionNode,
	BlockNode
]

export default class IfNode extends Node<ParsedIf, { condition: ExpressionNode, body: BlockNode }> {
	parse([_, conditionGroup, body]: ParsedIf) {
		return {condition: conditionGroup.value, body}
	}
}
