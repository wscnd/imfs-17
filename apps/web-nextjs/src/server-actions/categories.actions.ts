'use server';
import 'server-only';
import type { TCategory } from '@nx-imfs-17/shared/types';
import { cache } from 'react';

export const preloadCategories = (id: string) => {
  void findCategoryById(id);
};

export const findCategoryById = cache(
  async (categoryID: string): Promise<TCategory> => {
    const response = await fetch(
      `${process.env.CATALOG_API_URL}/category/${categoryID}`,
      {
        next: {
          revalidate: 1,
        },
      },
    );
    return response.json();
  },
);

export const useCategories = cache(async () => {
  const response = await fetch(`${process.env.CATALOG_API_URL}/category`, {
    next: {
      revalidate: 30,
    },
  });

  if (response.status != 200) {
    return [];
  }

  const categories: Array<TCategory> = await response.json();
  if (!categories.length) {
    return [];
  }

  return categories;
});
