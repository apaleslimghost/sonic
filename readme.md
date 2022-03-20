# <img alt="Sonic the Hedgehog" src="https://emoji.slack-edge.com/T01UWFL9HMZ/sonic-/65250706218cefee.gif" width="48" align="left"> sonic

a parser and linter for (Fastly) VCL

# todo

- [ ] parsing all of VCL lol
	- [ ] parsing includes and queueing those files for parsing & linting
	- [ ] remaining statements
	- [ ] functions
- [ ] build things that will be needed for linting
	- [ ] tree walking & selectors
	- [ ] scope analysis
	- [ ] type information for nodes
- [ ] linting system
	- [ ] rules and configuration
	- [ ] initial rules
		- [ ] discuss with team
		- [ ] steal stuff from falco
		- [ ] correct scoping for subroutines
		- [ ] correct return destinations for subroutines
		- [ ] variable declarations
		- [ ] path munging
		- [ ] checking error number ranges
		- [ ] redundant if conditions
		- [ ] unreachable code
- [ ] tests!
- [ ] plugin system
- [ ] a CLI
