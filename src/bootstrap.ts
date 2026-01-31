import { createApp } from './server.js'
import { RedisUniqueIdGenerator } from './Infra/Cache/Redis/RedisUniqueIdGenerator.js'
import { UrlMongoRepository } from './Infra/Persistence/Mongo/UrlMongoRepository.js'
import { env } from './Infra/Config/Env.js'

const PORT = Number(env.APP_PORT) || 3000

const server = createApp({
	repo: new UrlMongoRepository(),
	uniqueIdGenerator: new RedisUniqueIdGenerator(),
})

server.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`)
})

const shutdown = async (signal: string) => {
	console.log(`Received ${signal}. Shutting down...`)
	server.close(() => {
		process.exit(0)
	})
}

process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)
