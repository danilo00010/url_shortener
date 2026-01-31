const APP_PORT = process.env.APP_PORT ?? 3000

export const env = {
	APP_PORT,
	APP_URL: process.env.APP_URL ?? `http://localhost:${APP_PORT}`,
	HASH_SALT: process.env.HASH_SALT,

	MONGO_CONNECTION_URL: process.env.MONGO_CONNECTION_URL,
	MONGO_DATABASE: process.env.MONGO_DATABASE,
	MONGO_COLLECTION: process.env.MONGO_COLLECTION ?? 'urls',

	REDIS_CONNECTION_URL: process.env.REDIS_CONNECTION_URL,
}
