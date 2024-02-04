'use server';
import 'server-only';
import {
  getCartFromCookies,
  getLoginTokenFromCookies,
} from './cookies.actions';
import { Order, TOrder } from '@nx-imfs-17/shared/types';
import { KeyGen } from '@nx-imfs-17/shared/utils';
import { redirect } from 'next/navigation';

export async function placeOrder(formData: FormData) {
  const {
    login: { token },
  } = await getLoginTokenFromCookies();
  const cardDetails = Object.fromEntries(Array.from(formData.entries())) as {
    'cc-name': string;
    'cc-number': string;
    'cc-exp': string;
    'cc-csc': string;
  };

  const { cart } = await getCartFromCookies();

  const kg = new KeyGen();
  const enc = kg.cypher(JSON.stringify(cardDetails));

  const order: Order = {
    items: Object.values(cart.items).map(({ id: product_id, quantity }) => ({
      product_id,
      quantity,
    })),

    card_hash: enc,
  };

  const orderResponse = await fetch(`${process.env.ORDER_CREATE_URL}`, {
    method: 'POST',
    body: JSON.stringify(order),
    next: {
      revalidate: 1,
    },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (orderResponse.status == 201) {
    const response: TOrder = await orderResponse.json();

    const { cookieStore } = await getCartFromCookies();
    cookieStore.set('cart', JSON.stringify({ items: {} }));
    redirect(`/checkout/${response.id}/success`);
  }
}

export async function findOrders(): Promise<Array<TOrder>> {
  const {
    login: { token },
  } = await getLoginTokenFromCookies();
  const findOrderResponse = await fetch(`${process.env.ORDER_CREATE_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (findOrderResponse.status != 200) {
    return [];
  }

  return await findOrderResponse.json();
}

export async function findOrderById(id: string): Promise<TOrder> {
  const {
    login: { token },
  } = await getLoginTokenFromCookies();
  const findOrderResponse = await fetch(
    `${process.env.ORDER_CREATE_URL}/${id}`,
    {
      next: {
        revalidate: 30,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (findOrderResponse.status != 200) {
    redirect(`/orders/`);
  }

  return await findOrderResponse.json();
}
