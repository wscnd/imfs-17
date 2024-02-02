import type { TProduct } from '@nx-imfs-17/shared/types';
import { cache } from 'react';
import 'server-only';

export const preloadProducts = (id: string) => {
  void getProduct(id);
};

export const getProduct = cache(
  async (productID: string): Promise<TProduct> => {
    const response = await fetch(
      `${process.env.CATALOG_API_URL}/product/${productID}`,
      {
        next: {
          revalidate: 1,
        },
      }
    );
    return response.json();
  }
);

export const getProducts = cache(
  async (): Promise<Array<TProduct>> => {
    const response = await fetch(`${process.env.CATALOG_API_URL}/product`, {
      next: {
        revalidate: 30,
      },
    });
    return response.json();
  }
);
