export type TCategory = {
  id: string;
  name: string;
};

export interface CookieCart {
  items: Record<string, TProduct & { quantity: number }>;
  card_hash: string;
}

export interface Order {
  items: Array<{
    product_id: string;
    quantity: number;
  }>;
  card_hash: string;
}

export type CookieLogin = {
  token: string;
};

export type TProduct = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
  category_id: string;
};

export enum EOrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
}

export interface TOrder {
  status: EOrderStatus;
  id: string;
  total: string;
  client_id: number;
  created_at: string;
  items: Array<TOrderCartItem>;
}

export interface TOrderCartItem {
  id: string;
  quantity: number;
  price: string;
  product_id: string;
  order_id: string;
  product: TProduct;
}

export interface ILoginParams {
  username: string;
  password: string;
}

export interface ILoginMe {
  sub: number;
  username: string;
  iat: number;
  exp: number;
}

export interface IRabbitOrderMessage {
  order_id: string;
  card_hash: string;
  total: number;
}
