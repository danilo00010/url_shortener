import { createApp } from '../../src/server.js'
import { describe, before, after, it } from 'node:test'
import { strictEqual, ok } from 'node:assert'
import { UrlInMemoryRepository } from '../../src/Infra/Persistence/InMemory/UrlInMemoryRepository.js'
import { InMemoryUniqueIdGenerator } from '../../src/Infra/Cache/InMemory/InMemoryUniqueIdGenerator.js'
import { env } from '../../src/Infra/Config/Env.js'
import { getGlobalDispatcher } from 'undici'

let server: any
let baseUrl: string

describe('Short Url flow (E2E)', () => {
	before(async () => {
		server = createApp({
			repo: new UrlInMemoryRepository(),
			uniqueIdGenerator: new InMemoryUniqueIdGenerator(),
		})

		await new Promise<void>(resolve => {
			server.listen(env.APP_PORT, () => {
				baseUrl = env.APP_URL
				resolve()
			})
		})
	})

	after(async () => {
		await new Promise(resolve => {
			server.close(resolve)
			// getGlobalDispatcher().close()
		})
	})

	it('should generate a new short url', async () => {
		const response = await fetch(`${baseUrl}/short`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				longUrl: 'https://www.example.com',
			}),
		})

		strictEqual(response.status, 201)

		const body = await response.json()
		ok(body.shortUrl)
	})
})
