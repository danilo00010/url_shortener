import Url, { UrlProps } from '../../Domain/Entities/Url.js'

export default class UrlPresenter {
	static toJson(url: Url) {
		return {
			id: url.id?.value,
			long: url.long,
			shortCode: url.shortCode.value,
			createdAt: url.createdAt,
		}
	}

	static toEntity(urlProps: UrlProps) {
		return new Url(urlProps)
	}
}
