'use server';
import 'server-only';
import { findProductById } from './products.actions';
import { getCartFromCookies } from './cookies.actions';

export async function addToCart(formData: FormData) {
  const { product_id, quantity } = Object.fromEntries(
    Array.from(formData.entries()),
  ) as { product_id: string; quantity: string };

  const { cart, cookieStore } = await getCartFromCookies();

  const found = await findProductById(product_id);

  cart.items = {
    ...cart.items,
    [found.id]: {
      ...found,
      quantity: parseInt(quantity),
    },
  };

  cookieStore.set('cart', JSON.stringify(cart));
}

export async function removeFromCart(formData: FormData) {
  const product_id = formData.get('product_id');

  const { cart, cookieStore } = await getCartFromCookies();

  if (Object.hasOwn(cart.items, product_id as string)) {
    delete cart.items[product_id as string];
  }

  cookieStore.set('cart', JSON.stringify(cart));
}
