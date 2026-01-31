import { shortUrlPostPath } from './paths/shortUrl.post.js'
import { redirectGetPath } from './paths/redirect.get.js'

export const openapi = {
	openapi: '3.0.3',
	info: {
		title: 'URL Shortener',
		version: '1.0.0',
	},
	paths: {
		'/short': shortUrlPostPath,
		'/{code}': redirectGetPath,
	},
}
