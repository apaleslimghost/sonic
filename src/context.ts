import { File } from "./file.js";

export class Context {
	static async load(paths: string[]): Promise<Context> {
		const files = await Promise.all(paths.map(File.load))
		return new Context(files)
	}

	constructor(public files: File[] = []) {}

	async load(path: string): Promise<void> {
		this.files.push(await File.load(path))
	}
}
