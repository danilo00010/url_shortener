import { describe, it } from 'node:test'
import { equal, ok, rejects } from 'node:assert'
import { GetLongUrlUseCase } from '../../src/Application/GetLongUrlUseCase.js'
import { ShortUrlUseCase } from '../../src/Application/ShortUrlUseCase.js'
import { UrlNotFound } from '../../src/Domain/Errors/UrlNotFound.js'
import { UrlInMemoryRepository } from '../../src/Infra/Persistence/InMemory/UrlInMemoryRepository.js'

describe('GetLongUrl test suite', () => {
	const repo = new UrlInMemoryRepository()
	const shortUrlUseCase = new ShortUrlUseCase(repo)
	const getLongUrlUseCase = new GetLongUrlUseCase(repo)

	it('should retrieve a valid long url', async () => {
		const url = await shortUrlUseCase.execute('https://www.example.com', 1)
		ok(url.shortCode)

		const longUrl = await getLongUrlUseCase.execute(url.shortCode.value)
		equal(url.long.value, longUrl)
	})

	it('should throw UrlNotFound when short code does not exist', async () => {
		await rejects(() => getLongUrlUseCase.execute('abc123'), UrlNotFound)
	})
})
