import { promises as fs } from 'fs'
import { expectEOF, expectSingleResult } from 'typescript-parsec'
import parser from './parser.js'
import StatementNode from './ast/statement'
import lexer from './lexer.js'
import { Context } from './context.js'

export class File {
	source: string
	ast: StatementNode[]

	static async load(path: string, context: Context): Promise<File> {
		const file = new File(path, context)
		await file.parse()
		return file
	}

	constructor(public path: string, public context: Context) {}

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
