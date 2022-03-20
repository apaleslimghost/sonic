import { Token } from "typescript-parsec";
import { TokenType } from "../lexer";
import Node from "./node";

type ParsedReturn = [
	Token<TokenType.Return>,
	[
		Token<TokenType.LeftParen>,
		Token<TokenType.ReturnJump>,
		Token<TokenType.RightParen>,
	] | undefined,
	Token<TokenType.Semicolon>
]

type ReturnJump =
	| 'lookup'
	| 'pass'
	| 'error'
	| 'restart'
	| 'hash'
	| 'deliver'
	| 'fetch'
	| 'deliver_stale'

export default class ReturnStatementNode extends Node<ParsedReturn, { jump?: ReturnJump }> {
	parse([_, jump]: ParsedReturn) {
		return {
			jump: jump ? jump[1].text as ReturnJump : undefined
		}
	}
}
