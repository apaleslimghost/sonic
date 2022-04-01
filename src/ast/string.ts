import { Token } from 'typescript-parsec'
import { TokenType } from '../lexer.js'
import Node from './node.js'

export default class StringNode extends Node<Token<TokenType.StringLiteral>, string> {
	parse(string: Token<TokenType.StringLiteral>): string {
		return string.text.slice(1, -1)
	}
}
