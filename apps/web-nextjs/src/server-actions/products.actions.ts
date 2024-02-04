'use server';
import 'server-only';
import type { TProduct } from '@nx-imfs-17/shared/types';
import { cache } from 'react';
import { getCartFromCookies } from './cookies.actions';

export const preloadProducts = (id: string) => {
  void findProductById(id);
};

export const findProductById = cache(
  async (productID: string): Promise<TProduct> => {
    'use server';
    const response = await fetch(
      `${process.env.CATALOG_API_URL}/product/${productID}`,
      {
        next: {
          revalidate: 30,
        },
      },
    );
    return response.json();
  },
);

const cachedProducts = cache(async () => {
  const response = await fetch(`${process.env.CATALOG_API_URL}/product`, {
    next: {
      revalidate: 30,
    },
  });

  if (response.status != 200) {
    return [];
  }

  const products: Array<TProduct> = await response.json();
  if (!products.length) {
    return [];
  }

  return products;
});

type filterProducts = {
  byProductName?: string;
  byCategoryId?: string;
};

export const getProductsBy = async ({
  byCategoryId,
  byProductName,
}: filterProducts) => {
  let products = await cachedProducts();

  if (byProductName) {
    products = products.filter(({ name }) =>
      name.toLowerCase().includes(byProductName.toLowerCase()),
    );
  }

  if (byCategoryId) {
    products = products.filter(
      ({ category_id }) => category_id === byCategoryId,
    );
  }

  return products;
};

export const getProductsFromCookies = cache(async () => {
  const { cart } = await getCartFromCookies();

  return Object.entries(cart.items).map(([, details]) => [details]);
});
