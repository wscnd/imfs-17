'use server';
import 'server-only';
import { getLoginTokenFromCookies } from './cookies.actions';
import { ILoginMe } from '@nx-imfs-17/shared/types';
import { redirect } from 'next/navigation';

// TODO: use iron session
export async function loginAction(formData: FormData) {
  const { email, password } = Object.fromEntries(
    Array.from(formData.entries()),
  ) as { email: string; password: string };

  const body = {
    username: email,
    password,
  };

  const loginResponse = await fetch(`${process.env.LOGIN_URL}`, {
    method: 'POST',
    body: JSON.stringify(body),
    next: {
      revalidate: 1,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (loginResponse.status !== 201) {
    return false;
  }

  const response = await loginResponse.json();
  const { cookieStore } = await getLoginTokenFromCookies();
  cookieStore.set('me', JSON.stringify(response));
  return true;
}

async function isTokenExpired(): Promise<boolean> {
  const { login } = await getLoginTokenFromCookies();

  if (login.token?.length === 0) {
    return true;
  }
  const meResponse = await fetch(`${process.env.LOGIN_ME_URL}`, {
    next: {
      revalidate: 1,
    },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${login.token}`,
    },
  });

  if (meResponse.status !== 200) {
    return true;
  }

  const me: ILoginMe = await meResponse.json();
  const dateExpires = new Date(me.exp * 1000);

  return !(dateExpires > new Date());
}

export async function getUserToken(): Promise<string> {
  if (await isTokenExpired()) {
    return '';
  }

  const { login } = await getLoginTokenFromCookies();

  return login.token;
}

export async function logout() {
  const { cookieStore } = await getLoginTokenFromCookies();

  cookieStore.delete('me');
  redirect('/products');
}
