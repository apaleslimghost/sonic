import { Token } from 'typescript-parsec'
import { TokenType } from '../lexer'
import Node from './node'

export default class StringNode extends Node<Token<TokenType.StringLiteral>, string> {
	parse(string: Token<TokenType.StringLiteral>): string {
		return string.text.slice(1, -1)
	}
}
