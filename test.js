const { expectSingleResult, expectEOF } = require('typescript-parsec')
const {parser, lexer} = require('./')
const fs = require('fs')

const testFile = fs.readFileSync('./test.vcl', 'utf8')

console.dir(
	expectSingleResult(
		expectEOF(
			parser.parse(
				lexer.parse(`if (
					(req.backend == F_test && req.http.FT-Mock-Backend ~ "access")
					|| "test"
				) {
					return (pass);
				}`)
			)
		)
	),
	{depth: null}
)
