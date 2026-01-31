export class UrlNotFound extends Error {
	constructor(message?: string) {
		super(message ?? 'Url not found!')
	}
}
