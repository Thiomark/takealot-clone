export type CartItemType = {
  cart_id: string;
  product_id: string;
  quantity: number;
  products: ProductType;
};

export type ProductType = {
  id: string;
  price: number;
  name: string;
  images: string;
  qty: number;
};
