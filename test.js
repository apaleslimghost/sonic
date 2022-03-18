const { expectSingleResult, expectEOF } = require('typescript-parsec')
const {parser, lexer} = require('./')

console.log(
	expectSingleResult(
		expectEOF(
			parser.parse(
				lexer.parse('req.http.FT-Skip-Cache')
			)
		)
	)
)
