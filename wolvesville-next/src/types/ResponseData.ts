export type IResponseData<T> = {
    count: number,
    totalCount: number,
    currentPage: number,
    numberOfPages: number,
    items: T[]
}