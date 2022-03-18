const { expectSingleResult, expectEOF } = require('typescript-parsec')
const {parser, lexer} = require('./')

console.log(
	expectSingleResult(
		expectEOF(
			parser.parse(
				lexer.parse('"hello i am a string"')
			)
		)
	)
)
