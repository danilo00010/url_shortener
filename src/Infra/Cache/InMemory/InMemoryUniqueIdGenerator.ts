import { UniqueIdGenerator } from '../../../Domain/Cache/UniqueGenerator.js'

export class InMemoryUniqueIdGenerator implements UniqueIdGenerator {
	private value: number = 1

	async next(): Promise<number> {
		return this.value++
	}
}
