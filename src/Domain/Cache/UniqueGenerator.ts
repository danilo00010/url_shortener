export interface UniqueIdGenerator {
	next(): Promise<number>
}
