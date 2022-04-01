import { promises as fs } from 'fs'
import { expectEOF, expectSingleResult } from 'typescript-parsec'
import { parser } from '.'
import StatementNode from './ast/statement'
import lexer from './lexer'

export class File {
	source: string
	ast: StatementNode[]

	constructor(public path: string) {}

	async load(): Promise<string> {
		return this.source ??= await fs.readFile(this.path, 'utf-8')
	}

	async parse(): Promise<StatementNode[]> {
		return this.ast ??= expectSingleResult(
			expectEOF(
				parser.parse(
					lexer.parse(
						await this.load()
					)
				)
			)
		)
	}
}
