import { describe, it } from 'node:test'
import { ok, strictEqual } from 'node:assert'
import Url from '../../src/Domain/Entities/Url.js'
import LongUrl from '../../src/Domain/ValueObjects/LongUrl.js'
import ShortCode from '../../src/Domain/ValueObjects/ShortCode.js'

describe('Url test suite', () => {
	it('should generate a valid Url', () => {
		const shortCode = ShortCode.new(1)

		const newUrl = new Url({
			long: 'https://example.com',
			shortCode: shortCode.value,
		})

		ok(newUrl.shortCode.value)
	})
})
