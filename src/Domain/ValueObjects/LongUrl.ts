import InvalidLongUrlError from '../Errors/InvalidLongUrlError.js'

export default class LongUrl {
	public readonly value: string

	constructor(value: string) {
		const rawValue = value.trim().toLowerCase()

		if (!this.isValid(rawValue)) throw new InvalidLongUrlError()
		this.value = rawValue
	}

	isValid(value: string): boolean {
		if (!value.startsWith('https://')) return false

		try {
			new URL(value)
		} catch (error) {
			return false
		}

		return true
	}
}
