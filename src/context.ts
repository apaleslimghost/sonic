import { File } from "./file.js";

export class Context {
	files: Map<string, File> = new Map()

	static async load(paths: string[]): Promise<Context> {
		const context = new Context()
		const files = await Promise.all(
			paths.map(
				path => context.load(path)
			)
		)

		return context
	}

	async load(path: string): Promise<void> {
		if(!this.files.has(path)) {
			this.files.set(path, await File.load(path, this))
		}
	}
}
