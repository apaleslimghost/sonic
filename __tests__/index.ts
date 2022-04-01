import { lexer, parser } from '../src'
import * as fs from 'fs'
import * as path from 'path'

const testFile = fs.readFileSync(path.join(
	__dirname,
	'fixtures',
	'test.vcl'
), 'utf8')

test('lexer snapshot', () => {
	expect(lexer.parse(testFile)).toMatchSnapshot()
})

test('ast snapshot', () => {
	expect(
		parser.parse(
			lexer.parse(testFile)
		)
	).toMatchSnapshot()
})
