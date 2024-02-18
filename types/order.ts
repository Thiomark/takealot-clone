import { AddressType, CartItemType } from "./cart";
import { PersonalInfoType } from "./profile";

export type OrderType = {
  cart_items: CartItemType[];
  created_at: string;
  cart_id: string;
  order_id: string;
  cart_subtotal: number;
  is_paid: boolean;
  cart_shipping: number;
  shipping_address: AddressType;
  personal_information: PersonalInfoType;
  cart_total: string;
  billing_address: AddressType;
  updated_at: string;
  userId: null | string;
};
