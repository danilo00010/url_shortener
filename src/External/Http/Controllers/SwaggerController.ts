import { IncomingMessage, ServerResponse } from 'node:http'
import swaggerUiDist from 'swagger-ui-dist'
import fs from 'node:fs'
import path from 'node:path'

const swaggerPath = swaggerUiDist.getAbsoluteFSPath()

const mimeTypes: Record<string, string> = {
	'.html': 'text/html',
	'.js': 'application/javascript',
	'.css': 'text/css',
	'.png': 'image/png',
	'.svg': 'image/svg+xml',
	'.json': 'application/json',
}

export class SwaggerController {
	handle(req: IncomingMessage, res: ServerResponse) {
		const url = req.url!

		const file =
			url === '/docs' || url === '/docs/'
				? 'index.html'
				: url.replace('/docs/', '')

		const filePath = path.join(swaggerPath, file)

		if (!fs.existsSync(filePath)) {
			res.statusCode = 404
			res.end()
			return
		}

		const ext = path.extname(filePath)
		const contentType = mimeTypes[ext] ?? 'application/octet-stream'
		res.setHeader('Content-Type', contentType)

		if (file === 'index.html') {
			const html = fs.readFileSync(filePath, 'utf8')

			const configuredHtml = html
				.replace('<head>', '<head><base href="/docs/">')
				.replace(
					'</body>',
					`
						<script>
						window.onload = () => {
							window.ui = SwaggerUIBundle({
							url: '/openapi.json',
							dom_id: '#swagger-ui',
							deepLinking: true,
							presets: [
								SwaggerUIBundle.presets.apis,
								SwaggerUIStandalonePreset
							],
							layout: "StandaloneLayout"
							});
						};
						</script>
						</body>
					`,
				)

			res.end(configuredHtml)
			return
		}

		res.end(fs.readFileSync(filePath))
	}
}
