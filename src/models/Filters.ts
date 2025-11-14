export type FilteredRequest<T = object> = {
  filters?: T;
  pagination: { page: number; size: number };
  sort: Array<string>;
};

export type DateRangeValue = {
  from?: Date | null;
  to?: Date | null;
};
