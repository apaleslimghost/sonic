import IdentifierNode from "./identifier";
import Node from "./node";

export default class DottedAccessNode extends Node<IdentifierNode[], IdentifierNode[]> {
	parse(parts: IdentifierNode[]) {
		return parts
	}
}
