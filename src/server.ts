import { createServer } from 'node:http'
import type { IncomingMessage, ServerResponse } from 'node:http'
import {
	RedirectToUrlController,
	ShortUrlController,
	OpenApiController,
	SwaggerController,
} from './External/Http/Controllers/index.js'

export function createApp({ repo, uniqueIdGenerator }: any) {
	const redirectToUrlController = new RedirectToUrlController(repo)
	const shortUrlController = new ShortUrlController(repo, uniqueIdGenerator)
	const openApiController = new OpenApiController()
	const swaggerController = new SwaggerController()

	return createServer(async (req: IncomingMessage, res: ServerResponse) => {
		const isGet = req.method === 'GET'
		const isPost = req.method === 'POST'

		if (isPost && req.url === '/short') {
			return shortUrlController.handle(req, res)
		}

		if (isGet && req.url === '/openapi.json') {
			return openApiController.handle(req, res)
		}

		if (isGet && req.url?.startsWith('/docs')) {
			return swaggerController.handle(req, res)
		}

		if (isGet && req.url && req.url !== '/' && req.url !== '/short') {
			return redirectToUrlController.handle(req, res)
		}

		res.statusCode = 404
		res.end()
	})
}
