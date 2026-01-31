import { createClient } from 'redis'
import { env } from '../Config/Env.js'

class RedisClient {
	public readonly redisInstance

	constructor(connection_url: string) {
		this.redisInstance = createClient({
			url: connection_url,
		})

		this.redisInstance.on('error', error => {
			console.error('Redis error', error)
		})

		this.redisInstance.connect()
	}
}

export const redis = new RedisClient(env.REDIS_CONNECTION_URL!)
