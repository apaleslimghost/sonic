import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { globby } from 'globby'
import { File } from './file.js'

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
	const files = paths.map(path => new File(path))

	console.log(files)
}
