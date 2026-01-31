import { UniqueIdGenerator } from '../../../Domain/Cache/UniqueGenerator.js'
import { redis } from '../../Libraries/RedisClient.js'

export class RedisUniqueIdGenerator implements UniqueIdGenerator {
	private readonly key = 'short_url:counter'

	async next(): Promise<number> {
		return await redis.redisInstance.incr(this.key)
	}
}
