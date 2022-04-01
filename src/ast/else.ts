import { Token } from "typescript-parsec"
import { TokenType } from "../lexer.js"
import BlockNode from "./block.js"
import ExpressionNode from "./expression.js"
import GroupedExpressionNode from "./grouped-expression.js"
import IfNode from "./if.js"
import Node from "./node.js"

type ParsedElse = [
	Token<TokenType.Else>,
	BlockNode | IfNode
]

export default class ElseNode extends Node<ParsedElse, { body: BlockNode | IfNode }> {
	parse([_, body]: ParsedElse) {
		return { body }
	}
}
