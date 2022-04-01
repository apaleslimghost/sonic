import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { globby } from 'globby'
import { File } from './file.js'
import { Context } from './context.js'

interface Arguments {
	_: string[]
}

const argv = yargs(hideBin(process.argv))
	.option('_', {
		type: 'string',
		array: true
	})
	.command('$0', 'lint files', () => {}, lint)
	.parse()

async function lint(argv: Arguments) {
	const paths = await globby(argv._)
	const context = await Context.load(paths)
	console.log(context.files.keys())

	for(const file of context.files.values()) {
		file.ast.traverse(console.log)
	}
}
