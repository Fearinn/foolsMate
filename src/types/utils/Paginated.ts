export type Paginated<T> = Partial<
  {
    page: number;
    limit: number;
  } & T
>;
