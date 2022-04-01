import Node, { TraverseCallback } from "./node.js";
import StatementNode from "./statement.js";

export default class RootNode extends Node<StatementNode[], StatementNode[]> {
	parse(statements: StatementNode[]) {
		return statements
	}

	async traverse(callback: TraverseCallback) {
		await super.traverse(callback)

		for(const node of this.value) {
			await node.traverse(callback)
		}
	}
}
