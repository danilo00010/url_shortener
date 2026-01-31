export const shortUrlPostPath = {
	post: {
		summary: 'Create a short URL',
		requestBody: {
			required: true,
			content: {
				'application/json': {
					schema: {
						type: 'object',
						required: ['longUrl'],
						properties: {
							longUrl: { type: 'string', format: 'uri' },
						},
					},
				},
			},
		},
		responses: {
			201: {
				description: 'URL created',
			},
			400: {
				description: 'Invalid or missing long URL',
			},
			500: {
				description: 'Unpexpected internal server error',
			},
		},
	},
}
