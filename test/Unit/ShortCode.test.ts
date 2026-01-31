import { describe, it } from 'node:test'
import ShortCode from '../../src/Domain/ValueObjects/ShortCode.js'
import { ok, strictEqual } from 'node:assert'

describe('VO ShortCode test suite', () => {
	it('should generate a new ShortCode', () => {
		const shortCode = ShortCode.new(1)

		ok(shortCode.value)
	})

	it('should return false when comparing different ShortCodes', () => {
		const firstShortCode = ShortCode.new(1)
		const secondShortCode = ShortCode.new(2)

		const result = firstShortCode.compare(secondShortCode.value)

		strictEqual(result, false)
	})

	it('should return true when comparing same ShortCodes', () => {
		const firstShortCode = ShortCode.new(1)
		const secondShortCode = ShortCode.new(1)

		const result = firstShortCode.compare(secondShortCode.value)

		strictEqual(result, true)
	})
})
