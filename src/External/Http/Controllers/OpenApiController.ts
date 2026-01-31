import { IncomingMessage, ServerResponse } from 'node:http'
import { openapi } from '../OpenApi/index.js'

export class OpenApiController {
	handle(req: IncomingMessage, res: ServerResponse) {
		res.setHeader('Content-Type', 'application/json')
		res.end(JSON.stringify(openapi))
	}
}
