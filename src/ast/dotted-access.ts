import IdentifierNode from "./identifier.js";
import Node from "./node.js";

export default class DottedAccessNode extends Node<IdentifierNode[], IdentifierNode[]> {
	parse(parts: IdentifierNode[]) {
		return parts
	}
}
