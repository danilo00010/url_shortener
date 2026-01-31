import { MongoClient } from 'mongodb'
import { UrlSaveError } from '../Errors/UrlSaveError.js'
import Url from '../../../Domain/Entities/Url.js'
import UrlRepository from '../../../Domain/Repositories/UrlRepository.js'
import UrlPresenter from '../../Presenters/UrlPresenter.js'
import { env } from '../../Config/Env.js'

export class UrlMongoRepository implements UrlRepository {
	private client
	private database
	private urls

	constructor() {
		this.client = new MongoClient(env.MONGO_CONNECTION_URL!)
		this.database = this.client.db(env.MONGO_DATABASE)
		this.urls = this.database.collection(env.MONGO_COLLECTION)
	}

	public async find(shortCode: string): Promise<Url | null> {
		const url = await this.urls.findOne({
			shortCode,
		})

		if (!url) {
			return null
		}

		return UrlPresenter.toEntity({
			long: url.longUrl,
			shortCode: url.shortCode,
		})
	}

	public async save(url: Url): Promise<void> {
		try {
			await this.urls.insertOne({
				longUrl: url.long.value,
				shortCode: url.shortCode.value,
				createdAt: new Date().toISOString(),
			})
		} catch (error) {
			throw new UrlSaveError()
		}
	}
}
