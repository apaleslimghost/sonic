export default abstract class Node<V, T> {
	value: T

	constructor(value: V) {
		this.value = this.parse(value)
	}

	abstract parse(value: V): T

	*[Symbol.iterator](): IterableIterator<Node<unknown, unknown>> {
		yield this
	}
}
