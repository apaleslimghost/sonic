const { expectSingleResult, expectEOF } = require('typescript-parsec')
const {parser, lexer} = require('./')

console.dir(
	expectSingleResult(
		expectEOF(
			parser.parse(
				lexer.parse(`
				if (req.http.FT-Skip-Cache == "Yes") {
					set var.skipped = "hello";
					if (req.http.FT-Skip-Cache == "Yes") {
						set var.skipped = "hello";
					}
				}
				`)
			)
		)
	),
	{depth: null}
)
