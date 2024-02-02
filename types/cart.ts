import type { FieldValue } from "firebase/firestore";
import {
  AddProductToCartProductType,
  ProductType,
  SelectedOptions,
} from "./product";
import { PersonalInfoType } from "./profile";

export interface CartContextType {
  loading: boolean;
  cart: Array<ProductType>;
  shipping: number;
  cartTotal: number;
  cartSubTotal: number;
  cartId: string;
  personalInfo: {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
  };
  shippingAddress: AddressType;
  billingAddress: AddressType;
  fetchCart: () => Promise<void>;
  addItemToCart: (newProduct: AddProductToCartProductType) => Promise<void>;
  deleteFromCart: (productId: string) => Promise<void>;
}

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
