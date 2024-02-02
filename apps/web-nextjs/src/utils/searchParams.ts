import { createSearchParamsCache, parseAsString } from 'nuqs/parsers';

export const searchParsers = {
  byCategoryId: parseAsString,
  byProductName: parseAsString,
};

export const searchParamsCache = createSearchParamsCache(searchParsers);
