import type { NextApiRequest, NextApiResponse } from "next";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

type ResponseData = {
  message: string;
  error: any;
};

const SUPABASE_URL: string | undefined = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY: string | undefined =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const FREE_CURRENCY_API: string | undefined = process.env.FREE_CURRENCY_API;
const supabase: SupabaseClient = createClient(
  SUPABASE_URL!,
  SUPABASE_ANON_KEY!
);
const environment: string = process.env.ENVIRONMENT || "sandbox";
const client_id: string | undefined = process.env.CLIENT_ID;
const client_secret: string | undefined = process.env.CLIENT_SECRET;
const endpoint_url: string =
  environment === "sandbox"
    ? "https://api-m.sandbox.paypal.com"
    : "https://api-m.paypal.com";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const { cartId, shippingAddressId, billingAddressId } = req.body as {
      cartId: string;
      shippingAddressId: string;
      billingAddressId: string;
    };

    const access_token: string = await get_access_token();

    // Check if an order with the same ID already exists
    const { data: existingOrder } = await supabase
      .from("orders")
      .select("id")
      .eq("id", cartId)
      .single();

    if (existingOrder) {
      throw new Error(`Order with the same ID already exists.`);
    }

    const { data: cartItems, error: cartItemsError } = await supabase
      .from("cart_items")
      .select("*, products(*)")
      .eq("cart_id", cartId);

    if (cartItemsError) {
      throw new Error(
        `Failed to fetch cart items due to: ${cartItemsError.message}`
      );
    }

    if (!cartItems || cartItems.length === 0) {
      throw new Error(`Cart with ID: ${cartId} does not have any items.`);
    }

    // Calculate the cart total amount
    let totalAmount = cartItems.reduce((accumulator, cartItem) => {
      return accumulator + cartItem.products.price * cartItem.quantity;
    }, 0);

    const currencyResponse = await fetch(
      `https://api.freecurrencyapi.com/v1/latest?apikey=${FREE_CURRENCY_API}&currencies=ZAR`,
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

    const convertedAmount = parseFloat((totalAmount / ZAR).toFixed(2));

    const { data: orderCart, error: orderCartError } = await supabase
      .from("carts")
      .update({
        shipping_address_id: shippingAddressId,
        billing_address_id: billingAddressId,
        cart_items_amount: convertedAmount,
      })
      .eq("id", cartId)
      .select();

    if (orderCartError) {
      throw new Error(
        `Failed to update order due to: ${orderCartError.message}`
      );
    }

    if (!orderCart || orderCart.length === 0) {
      throw new Error(`No cart found with ID: ${cartId}`);
    }

    const order_data_json = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: convertedAmount,
          },
        },
      ],
    };

    const response = await fetch(endpoint_url + "/v2/checkout/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify(order_data_json),
    });

    const json = await response.json();
    res.send(json);

    // ... (rest of the function remains unchanged for brevity)
  } catch (err: any) {
    console.log(err);
    res.status(500).send(err.message || "An error occurred.");
  }
}

function get_access_token(): Promise<string> {
  const auth: string = `${client_id}:${client_secret}`;
  const data: string = "grant_type=client_credentials";

  const headers: HeadersInit = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: `Basic ${Buffer.from(auth).toString("base64")}`,
  };

  return fetch(endpoint_url + "/v1/oauth2/token", {
    method: "POST",
    headers,
    body: data,
  })
    .then((res) => res.json())
    .then((json: any) => {
      return json.access_token;
    });
}
