import type { FieldValue } from "firebase/firestore";
import { ProductType, SelectedOptions } from "./product";

export type CartItemType = {
  product_id: string;
  quantity: number;
  selected_options?: SelectedOptions;
};

export type CartType = {
  id: string;
  user_id?: string;
  shipping_address?: AddressType;
  billing_address?: AddressType;
  personal_information?: PersonalInfoType;
  cart_items?: CartItemType[];
  created_at: FieldValue;
  updated_at: FieldValue;
};

export type CartResponse = {
  cart_total: number;
  cart_shipping: number;
  cart_subtotal: number;
  personal_information: PersonalInfoType;
  billing_address: AddressType;
  shipping_address: AddressType;
  cart_items: Array<ProductType>;
};

export type AddressType = {
  street_address: string;
  complex_or_building?: string;
  suburb: string;
  city_or_town: string;
  province: string;
  post_code: string;
};

export type PersonalInfoType = {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
};
