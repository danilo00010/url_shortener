import { describe, it } from 'node:test'
import { ok, throws } from 'node:assert'
import LongUrl from '../../src/Domain/ValueObjects/LongUrl.js'

describe('VO LongUrl test suite', () => {
	it('should generate a new LongUrl', () => {
		const longUrl = new LongUrl('https://example.com')

		ok(longUrl.value)
	})

	it('should throw an error on invalid Url without https', () => {
		throws(() => {
			new LongUrl('http://example.com')
		})
	})

	it('should throw an error on invalid Url with space', () => {
		throws(() => {
			new LongUrl('https:// example.com')
		})
	})
})
