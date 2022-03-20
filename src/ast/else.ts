import { Token } from "typescript-parsec"
import { TokenType } from "../lexer"
import BlockNode from "./block"
import ExpressionNode from "./expression"
import GroupedExpressionNode from "./grouped-expression"
import IfNode from "./if"
import Node from "./node"

type ParsedElse = [
	Token<TokenType.Else>,
	BlockNode | IfNode
]

export default class ElseNode extends Node<ParsedElse, { body: BlockNode | IfNode }> {
	parse([_, body]: ParsedElse) {
		return { body }
	}
}
