import Url from '../Entities/Url.js'

export default interface UrlRepository {
	find(shortCode: string): Promise<Url | null>
	save(url: Url): Promise<void>
}
