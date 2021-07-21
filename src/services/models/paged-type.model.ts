import { SortingEnum } from "./sorting.enum";

export class Paged<T> {
	page!: number;
	pageSize!: number;
	recordsInPage!: number;
	totalPages!: number;
	filterBy!: string;
	orderBy!: string;
	sorting!: SortingEnum;
	items!: Array<T>;
}
