const { expectSingleResult, expectEOF } = require('typescript-parsec')
const {parser, lexer} = require('./')

console.dir(
	expectSingleResult(
		expectEOF(
			parser.parse(
				lexer.parse('(req.http.FT-Skip-Cache == req.http.fastly-ff) == "string"')
			)
		)
	),
	{depth: null}
)
