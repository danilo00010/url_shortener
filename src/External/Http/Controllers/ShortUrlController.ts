import { IncomingMessage, ServerResponse } from 'node:http'
import { RedisUniqueIdGenerator } from '../../../Infra/Cache/Redis/RedisUniqueIdGenerator.js'
import { ShortUrlUseCase } from '../../../Application/ShortUrlUseCase.js'
import InvalidLongUrlError from '../../../Domain/Errors/InvalidLongUrlError.js'
import UrlRepository from '../../../Domain/Repositories/UrlRepository.js'
import { env } from '../../../Infra/Config/Env.js'

export class ShortUrlController {
	constructor(
		private repo: UrlRepository,
		private uniqueIdGenerator: RedisUniqueIdGenerator,
	) {}

	handle(req: IncomingMessage, res: ServerResponse) {
		let body: string = ''

		req.on('data', chunk => {
			body += chunk.toString()
		})

		req.on('end', async () => {
			try {
				const { longUrl } = JSON.parse(body)

				if (!longUrl) {
					res.writeHead(400)
					res.end(
						JSON.stringify({
							error: 'Erro na validação dos dados: Url longa obrigatória!',
						}),
					)
				}

				const uniqueId = await this.uniqueIdGenerator.next()

				const useCase = new ShortUrlUseCase(this.repo)
				const url = await useCase.execute(longUrl, uniqueId)

				const shortUrl = `${env.APP_URL}/${url.shortCode.value}`

				res.writeHead(201)
				res.end(
					JSON.stringify({
						shortUrl,
					}),
				)
			} catch (error: any) {
				if (error instanceof InvalidLongUrlError) {
					res.writeHead(400, {
						'Content-Type': 'application/json',
					})
					res.end(
						JSON.stringify({
							error: error.message,
						}),
					)
				}

				res.writeHead(500, {
					'Content-Type': 'application/json',
				})
				res.end(
					JSON.stringify({
						error: error.message ?? 'Error when shorting the url!',
					}),
				)
			}
		})
	}
}
