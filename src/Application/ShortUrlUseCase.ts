import Url from '../Domain/Entities/Url.js'
import UrlRepository from '../Domain/Repositories/UrlRepository.js'
import LongUrl from '../Domain/ValueObjects/LongUrl.js'
import ShortCode from '../Domain/ValueObjects/ShortCode.js'

export class ShortUrlUseCase {
	constructor(private repo: UrlRepository) {}

	async execute(longUrl: string, uniqueId: number): Promise<Url> {
		const url = new Url({
			long: longUrl,
			shortCode: ShortCode.new(uniqueId).value,
		})

		await this.repo.save(url)

		return url
	}
}
