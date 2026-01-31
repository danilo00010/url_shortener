import { createApp } from '../../src/server.js'
import { describe, before, after, it } from 'node:test'
import { strictEqual, ok } from 'node:assert'
import { UrlInMemoryRepository } from '../../src/Infra/Persistence/InMemory/UrlInMemoryRepository.js'
import { InMemoryUniqueIdGenerator } from '../../src/Infra/Cache/InMemory/InMemoryUniqueIdGenerator.js'
import { env } from '../../src/Infra/Config/Env.js'
import { getGlobalDispatcher } from 'undici'

let server: any
let baseUrl: string

describe('Redirect to original Url (E2E)', () => {
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
			getGlobalDispatcher().close()
		})
	})

	it('should redirect to original url', async () => {
		const _response = await fetch(`${baseUrl}/short`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				longUrl: 'https://www.example.com',
			}),
		})

		strictEqual(_response.status, 201)

		const _body = await _response.json()
		ok(_body.shortUrl)

		const redirectResponse = await fetch(`${_body.shortUrl}`, {
			redirect: 'manual',
		})

		strictEqual(redirectResponse.status, 301)
		strictEqual(
			redirectResponse.headers.get('location'),
			'https://www.example.com',
		)
	})
})
