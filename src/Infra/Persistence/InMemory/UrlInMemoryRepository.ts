import Url from '../../../Domain/Entities/Url.js'
import UrlRepository from '../../../Domain/Repositories/UrlRepository.js'

export class UrlInMemoryRepository implements UrlRepository {
	private urls: Url[] = []

	async find(shortCode: string): Promise<Url | null> {
		const url = this.urls.find(u => u.shortCode.compare(shortCode))

		return url ?? null
	}

	async save(url: Url): Promise<void> {
		this.urls.push(url)
	}
}
