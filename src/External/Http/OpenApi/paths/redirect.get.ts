export const redirectGetPath = {
	get: {
		summary: 'Redirect to original URL',
		description: 'Redirects a short code to the original long URL',
		parameters: [
			{
				name: 'code',
				in: 'path',
				required: true,
				schema: {
					type: 'string',
				},
				example: 'abc123',
			},
		],
		responses: {
			301: {
				description: 'Redirected permanently',
				headers: {
					Location: {
						description: 'Original long URL',
						schema: {
							type: 'string',
							format: 'uri',
						},
					},
				},
			},
			400: {
				description: 'Request parameter "{code}" malformed or missing',
			},
			404: {
				description: 'Short URL not found',
			},
			500: {
				description: 'Unpexpected internal server error',
			},
		},
	},
}
