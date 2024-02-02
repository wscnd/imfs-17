export type TCategory = {
  id: string;
  name: string;
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
	PENDING = "pending",
	PAID = "paid",
	FAILED = "failed",
}

export type TOrder = {
	id: string;
	total: number;
	status: EOrderStatus;
	items: Array<TOrderCartItem>;
	created_at: string;
};

export type TOrderCartItem = {
	id: number;
	quantity: number;
	price: number;
	product: TProduct;
};
