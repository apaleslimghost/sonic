import Node from "./node.js";
import StatementNode from "./statement.js";

export default class RootNode extends Node<StatementNode[], StatementNode[]> {
	parse(statements: StatementNode[]) {
		return statements
	}

	*[Symbol.iterator](): IterableIterator<Node<unknown, unknown>> {
		yield this

		for(const node of this.value) {
			yield* node
		}
	}
}
