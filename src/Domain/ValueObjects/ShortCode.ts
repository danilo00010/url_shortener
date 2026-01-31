import Hashids from 'hashids'
import { env } from '../../Infra/Config/Env.js'

const ALPHABET =
	'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const hashids = new Hashids(env.HASH_SALT, 5, ALPHABET)

export default class ShortCode {
	public readonly value: string

	constructor(shortCode: string) {
		this.value = shortCode
	}

	compare(comparison: string): boolean {
		return this.value === comparison
	}

	static new(uniqueId: number): ShortCode {
		return new ShortCode(hashids.encode(uniqueId))
	}
}
