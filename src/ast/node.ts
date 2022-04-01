export type TraverseCallback = (node: Node<unknown, unknown>) => Promise<void> | void

export default abstract class Node<V, T> {
	value: T

	constructor(value: V) {
		this.value = this.parse(value)
	}

	abstract parse(value: V): T

	async traverse(callback: TraverseCallback): Promise<void> {
		await callback(this)
	}
}
