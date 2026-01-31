import Id from '../ValueObjects/Id.js'
import LongUrl from '../ValueObjects/LongUrl.js'
import ShortCode from '../ValueObjects/ShortCode.js'

export type UrlProps = {
	id?: string
	long: string
	shortCode: string
	createdAt?: string
}

export default class Url {
	public readonly id?: Id
	public readonly long: LongUrl
	public readonly shortCode: ShortCode
	public readonly createdAt?: string

	constructor(public readonly props: UrlProps) {
		this.id = new Id(props.id)
		this.long = new LongUrl(props.long)
		this.shortCode = new ShortCode(props.shortCode)
		this.createdAt = props.createdAt
	}
}
