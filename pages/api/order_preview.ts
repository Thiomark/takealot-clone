import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { CartItemType } from "../../types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;
const supabase = createClient(supabaseUrl, supabaseKey);
const currencyConverterToken: string | undefined =
  process.env.FREE_CURRENCY_API;

async function calculateCartAmount(cartItems: Array<CartItemType>) {
  try {
    let totalAmount = cartItems.reduce((accumulator, cartItem) => {
      return accumulator + cartItem.products.price * cartItem.quantity;
    }, 0);

    const currencyResponse = await fetch(
      `https://api.freecurrencyapi.com/v1/latest?apikey=${currencyConverterToken}&currencies=ZAR`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const currencyData = (await currencyResponse.json()) as {
      data: { ZAR: number };
    };

    const {
      data: { ZAR },
    } = currencyData;

    return parseFloat((totalAmount / ZAR).toFixed(2));
  } catch (error) {
    console.log(error);
    return 18;
  }
}

async function fetchCartWithAddresses(cartId: string) {
  const { data: cart, error } = await supabase
    .from("carts")
    .select(
      `
      *,
      billing_address:billing_address_id ( * ),
      shipping_address:shipping_address_id ( * )
    `
    )
    .eq("id", cartId);

  return { cart: cart?.[0], error };
}

async function fetchCartItems(cartId: string) {
  const { data: cartItems, error } = await supabase
    .from("cart_items")
    .select("*, products(*)")
    .eq("cart_id", cartId);

  return { cartItems, error };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { cartId } = req.body;

    if (!cartId) {
      return res.status(400).json({ error: "Cart ID is required." });
    }

    // Fetch the cart with address details
    const { cart, error: cartError } = await fetchCartWithAddresses(cartId);
    if (cartError)
      throw new Error(`Failed to fetch cart: ${cartError.message}`);
    if (!cart) return res.status(404).json({ error: "Cart not found." });

    const { cartItems, error: cartItemsError } = await fetchCartItems(cartId);
    if (cartItemsError)
      throw new Error(`Failed to fetch cart items: ${cartItemsError.message}`);

    const cartAmount = cartItems ? await calculateCartAmount(cartItems) : 0;

    res
      .status(200)
      .json({ ...cart, cart_items_amount: cartAmount, items: cartItems });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
