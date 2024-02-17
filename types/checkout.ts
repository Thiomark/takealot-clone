// Define the structure of the data related to the checkout process.
export interface CheckoutData {
  cart: boolean;
  userStep: boolean;
  shippingAddress: boolean;
  billingAddress: boolean;
  shippingMethod: boolean;
  review: boolean;
  payment: boolean;
  confirmation: boolean;
}
