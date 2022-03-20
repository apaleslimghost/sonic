import { Token } from 'typescript-parsec'
import { TokenType } from '../lexer'
import Node from './node'

export default class NumberNode extends Node<Token<TokenType.NumberLiteral>, { value: number, suffix: string }> {
	parse(number: Token<TokenType.NumberLiteral>) {
		const [, value, suffix] = number.text.match(/^(\d+)([a-z]*)$/)
		return {
			value: parseInt(value, 10),
			suffix
		}
	}
}