import { deepEqual, equal, rejects } from 'node:assert'
import { describe, it, afterEach } from 'node:test'
import { ShortUrlUseCase } from '../../src/Application/ShortUrlUseCase.js'
import InvalidLongUrlError from '../../src/Domain/Errors/InvalidLongUrlError.js'
import ShortCode from '../../src/Domain/ValueObjects/ShortCode.js'
import { UrlInMemoryRepository } from '../../src/Infra/Persistence/InMemory/UrlInMemoryRepository.js'

describe('Short Url', () => {
	let uniqueId = 1
	const repo = new UrlInMemoryRepository()
	const shortUrlUseCase = new ShortUrlUseCase(repo)

	afterEach(() => uniqueId++)

	it('should generate the same short code', async () => {
		const longUrl = 'https://www.example.com'

		const url = await shortUrlUseCase.execute(longUrl, uniqueId)

		const shortCode = ShortCode.new(uniqueId)

		equal(url.shortCode.value, shortCode.value)
	})

	it('should retrieve correct url', async () => {
		const longUrl = 'https://www.example.com'

		const newUrl = await shortUrlUseCase.execute(longUrl, uniqueId)
		const url = await repo.find(newUrl.shortCode.value)

		deepEqual(newUrl, url)
	})

	it('should throw an error of invalid long url', async () => {
		const invalidLongUrl = 'ww.g.c'

		await rejects(
			shortUrlUseCase.execute(invalidLongUrl, uniqueId),
			InvalidLongUrlError,
		)
	})
})
