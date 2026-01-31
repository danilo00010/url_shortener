import { GetLongUrlUseCase } from '../../../Application/GetLongUrlUseCase.js'
import { IncomingMessage, ServerResponse } from 'node:http'
import { UrlNotFound } from '../../../Domain/Errors/UrlNotFound.js'
import UrlRepository from '../../../Domain/Repositories/UrlRepository.js'

export class RedirectToUrlController {
	constructor(private repo: UrlRepository) {}

	handle(req: IncomingMessage, res: ServerResponse) {
		let body: string = ''

		req.on('data', chunk => {
			body += chunk.toString()
		})
		req.on('end', async () => {
			try {
				const requestUrl = new URL(req.url ?? '', `http://${req.headers.host}`)
				const shortenedCode = requestUrl.pathname.slice(1)

				if (!shortenedCode) {
					res.writeHead(400)
					res.end(
						JSON.stringify({
							error: 'Invalid short code!',
						}),
					)
					return
				}

				const useCase = new GetLongUrlUseCase(this.repo)
				const longUrl = await useCase.execute(shortenedCode)

				res.writeHead(301, {
					Location: longUrl,
				})
				res.end()
			} catch (error) {
				if (error instanceof UrlNotFound) {
					res.writeHead(404, { 'Content-Type': 'application/json' })
					res.end(
						JSON.stringify({
							error: error.message,
						}),
					)
					return
				}

				res.writeHead(500, { 'Content-Type': 'application/json' })
				res.end(
					JSON.stringify({
						error: 'Error when getting long url!',
					}),
				)
			}
		})
	}
}
