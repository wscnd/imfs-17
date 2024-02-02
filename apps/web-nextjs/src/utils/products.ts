import type { TProduct } from '@nx-imfs-17/shared/types';
import { cache } from 'react';
import 'server-only';

export const preloadProducts = (id: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  void useProduct(id);
};

export const useProduct = cache(
  async (productID: string): Promise<TProduct> => {
    const response = await fetch(
      `${process.env.CATALOG_API_URL}/product/${productID}`,
      {
        next: {
          revalidate: 1,
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
  byProductName: string | null;
  byCategoryId: string | null;
};

export const useProducts = async ({
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
