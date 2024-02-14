import { AddressType, CartItemType, CartType } from '@/types/cart';
import admin from '@/utils/firebaseAdmin';
import { ExtendedIncomingMessage } from '@/types/next';
import { SelectedOptions } from '@/types/product';
import { PersonalInfoType } from '@/types/profile';

export async function updateCart(req: ExtendedIncomingMessage, cartId: string) {
  if (!cartId) {
    return { error: 'Cart ID is required', statusCode: 400 };
  }

  let updatedCartData: Partial<CartType>;
  try {
    updatedCartData = req.body;
  } catch (error) {
    return { error: 'Invalid request body', statusCode: 400 };
  }

  try {
    const cartRef = admin.firestore().collection("carts").doc(cartId);
    const cartDoc = await cartRef.get();

    if (!cartDoc.exists) {
      return { error: 'Cart not found', statusCode: 404 };
    }

    const cart = cartDoc.data() as CartType;
    if (cart && cart.user_id && req['user'] && cart.user_id !== req['user'].uid) {
      return { error: 'Unauthorized to update this cart', statusCode: 403 };
    }

    if (updatedCartData.shipping_address) {
      validateAddress(updatedCartData.shipping_address as AddressType);
    }
    if (updatedCartData.billing_address) {
      validateAddress(updatedCartData.billing_address as AddressType);
    }
    if (updatedCartData.billing_address) {
      validatePersonalInfo(
        updatedCartData.personal_information as PersonalInfoType
      );
    }
    if (updatedCartData.cart_items) {
      validateCartItems(updatedCartData.cart_items as CartItemType[]);
    }

    const dataToUpdate: Partial<CartType> = {
      updated_at: admin.firestore.FieldValue.serverTimestamp(),
    };

    if (updatedCartData.shipping_method) {
        dataToUpdate.shipping_method = updatedCartData.shipping_method;
    }

    if (updatedCartData.shipping_address || cart.shipping_address) {
      dataToUpdate.shipping_address =
        updatedCartData.shipping_address || cart.shipping_address;
    }
    if (updatedCartData.billing_address || cart.billing_address) {
      dataToUpdate.billing_address =
        updatedCartData.billing_address || cart.billing_address;
    }
    if (updatedCartData.personal_information || cart.personal_information) {
      dataToUpdate.personal_information =
        updatedCartData.personal_information || cart.personal_information;
    }
    if (updatedCartData.cart_items || cart.cart_items) {
      dataToUpdate.cart_items = updatedCartData.cart_items || cart.cart_items;
    }

    await cartRef.update(dataToUpdate);
    const updatedCart = await cartRef.get();
    return updatedCart.data();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { error: `Failed to update cart: ${message}`, statusCode: 500 };
  }
}

export async function addToCart(
  cartId: string,
  productId: string,
  quantity: number,
  selectedOptions: SelectedOptions
) {
  if (!cartId || !productId || quantity === undefined) {
    throw new Error("Cart ID, Product ID, and quantity are required");
  }

  // Ensure quantity is always positive
  quantity = Math.abs(quantity);

  const productRef = admin.firestore().collection("products").doc(productId);
  const productDoc = await productRef.get();

  if (!productDoc.exists) {
    throw new Error("Product not found");
  }

  const productData = productDoc.data() as any;

  // Validate and process selected options
  if (productData.options) {
    if (
      productData.options.colours &&
      (!selectedOptions || !selectedOptions?.colour)
    ) {
      throw new Error("Colour option is required for this product");
    }
    if (
      productData.options.sizes &&
      (!selectedOptions ||
        !selectedOptions?.size ||
        selectedOptions.size === "Choose a size")
    ) {
      throw new Error("Size option is required for this product");
    }
  }

  // Fetch cart details
  const cartRef = admin.firestore().collection("carts").doc(cartId);
  const cartDoc = await cartRef.get();

  if (!cartDoc.exists) {
    throw new Error("Cart not found");
  }

  const cart = cartDoc.data() as CartType;

  if (!cart.cart_items) {
    cart.cart_items = [];
  }

  // Update or add the product in the cart
  const existingItemIndex = cart.cart_items.findIndex(
    (item) => item.product_id === productId
  );

  if (existingItemIndex > -1) {
    cart.cart_items[existingItemIndex].quantity = quantity;
    if (selectedOptions) {
      cart.cart_items[existingItemIndex].selected_options = selectedOptions;
    }
  } else {
    const newItem = {
      product_id: productId,
      quantity,
      selected_options: selectedOptions,
    };
    cart.cart_items.push(newItem);
  }

  // Update the cart in the database
  await cartRef.update({
    cart_items: cart.cart_items,
    updated_at: admin.firestore.FieldValue.serverTimestamp(),
  });

  return { message: "Item added to cart" };
}

function validateAddress(address: AddressType) {
  const requiredFields = [
    "street_address",
    "suburb",
    "city_or_town",
    "province",
    "post_code",
  ];
  for (const field of requiredFields) {
    if (!address[field as keyof AddressType]) {
      throw new Error(`Address field ${field} is required`);
    }
  }
}

function validatePersonalInfo(personalInfo: PersonalInfoType) {
  const requiredFields = ["first_name", "last_name", "phone_number", "email"];
  for (const field of requiredFields) {
    if (!personalInfo[field as keyof PersonalInfoType]) {
      throw new Error(`Personal Info field ${field} is required`);
    }
  }
}

// Helper function to validate cart items
function validateCartItems(cartItems: CartItemType[]) {
  for (const item of cartItems) {
    if (!item.product_id || item.quantity === undefined) {
      throw new Error(`Cart item must include product_id and quantity`);
    }
  }
}