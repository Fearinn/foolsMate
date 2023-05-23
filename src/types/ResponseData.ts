export type ResponseData<T> = {
    count: number,
    totalCount: number,
    currentPage: number,
    numberOfPages: number,
    items: T[]
}