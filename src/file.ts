import { promises as fs } from 'fs'
import { expectEOF, expectSingleResult } from 'typescript-parsec'
import parser from './parser.js'
import lexer from './lexer.js'
import { Context } from './context.js'
import RootNode from './ast/root.js'
import IncludeStatementNode from './ast/include-statement.js'
import path from 'path'

export class File {
	source: string
	ast: RootNode

	static async load(path: string, context: Context): Promise<File> {
		const file = new File(path, context)
		await file.parse()
		return file
	}

	constructor(public path: string, public context: Context) {}

	async load(): Promise<string> {
		return this.source ??= await fs.readFile(this.path, 'utf-8')
	}

	async parse(): Promise<RootNode> {
		if(!this.ast) {
			this.ast = expectSingleResult(
				expectEOF(
					parser.parse(
						lexer.parse(
							await this.load()
						)
					)
				)
			)

			await this.ast.traverse(async node => {
				if(node instanceof IncludeStatementNode) {
					console.log('HERE', node)
					const resolvedPath = path.resolve(
						path.dirname(this.path),
						node.value.path
					)

					await this.context.load(resolvedPath)
				}
			})

		}

		return this.ast
	}
}
