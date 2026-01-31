import { randomUUID } from 'crypto'

export default class Id {
	public readonly value: string

	constructor(id?: string) {
		this.value = id ?? randomUUID()
	}

	compare(comparison: string): boolean {
		return this.value === comparison
	}
}
