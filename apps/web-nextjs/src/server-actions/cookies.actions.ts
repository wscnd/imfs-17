'use server';
import 'server-only';
import { cookies } from 'next/headers';
import { CookieLogin, CookieCart } from '@nx-imfs-17/shared/types';

export const getCartFromCookies = async () => {
  let cart = { items: {} } as CookieCart;
  const cookieStore = cookies();
  const stored = cookieStore.get('cart')?.value;

  if (stored) {
    cart = JSON.parse(stored);
  }

  return { cart, cookieStore };
};

export const getLoginTokenFromCookies = async () => {
  let login = { token: '' } as CookieLogin;
  const cookieStore = cookies();
  const stored = cookieStore.get('me')?.value;

  if (stored) {
    login = JSON.parse(stored);
  }

  return { login, cookieStore };
};
