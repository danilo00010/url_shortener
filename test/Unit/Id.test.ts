import { describe, it } from 'node:test'
import Id from '../../src/Domain/ValueObjects/Id.js'
import { ok, strictEqual } from 'node:assert'
import { randomUUID } from 'node:crypto'

describe('VO Id test suite', () => {
	it('should generate a new Id', () => {
		const id = new Id()

		ok(id.value)
	})

	it('should return false when comparing different Ids', () => {
		const firstId = new Id()
		const secondId = new Id(randomUUID())

		const result = firstId.compare(secondId.value)

		strictEqual(result, false)
	})

	it('should return true when comparing equal Ids', () => {
		const uuid = randomUUID()

		const firstId = new Id(uuid)
		const secondId = new Id(uuid)

		const result = firstId.compare(secondId.value)

		strictEqual(result, true)
	})
})
