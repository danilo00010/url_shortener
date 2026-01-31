import { UrlNotFound } from '../Domain/Errors/UrlNotFound.js'
import UrlRepository from '../Domain/Repositories/UrlRepository.js'

export class GetLongUrlUseCase {
	constructor(private repo: UrlRepository) {}

	async execute(shortCode: string): Promise<string> {
		const url = await this.repo.find(shortCode)

		if (!url) {
			throw new UrlNotFound()
		}

		return url.long.value
	}
}
