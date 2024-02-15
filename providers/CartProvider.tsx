import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";
import { setCookie, deleteCookie } from "cookies-next";
import { AddProductToCartProductType } from "@/types/product";
import { toast } from "react-toastify";
import { SERVER_BASE_URL } from "@/config/index";
import extractErrorMessage, { AxiosError } from "@/utils/extractErrorMessage";
import { getCookie } from "cookies-next";
import { AddressType, CartContextType } from "@/types/cart";
import { useRouter } from "next/router";
import { PersonalInfoType } from "@/types/profile";

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState("");
  const [shipping, setShipping] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const [shippingMethod, setShippingMethod] = useState<{ type?: string }>({});
  const [personalInfo, setPersonalInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  });
  const [shippingAddress, setShippingAddress] = useState({
    complex_or_building: "",
    street_address: "",
    suburb: "",
    city_or_town: "",
    address_type: "",
    province: "",
    post_code: "",
  });
  const [billingAddress, setBillingAddress] = useState({
    complex_or_building: "",
    street_address: "",
    suburb: "",
    city_or_town: "",
    address_type: "",
    province: "",
    post_code: "",
  });

  useEffect(() => {
    // Function to check if an object has all properties empty
    const areAllFieldsEmpty = (obj: PersonalInfoType | AddressType) => {
      if (obj === null || obj === undefined) {
        return true; // Consider null or undefined objects as "empty" for this context
      }
      return Object.values(obj).every((x) => x === "");
    };

    // Check if personalInfo, shippingAddress, and billingAddress are empty
    if (
      areAllFieldsEmpty(personalInfo) ||
      areAllFieldsEmpty(shippingAddress) ||
      areAllFieldsEmpty(billingAddress)
    ) {
      router.push("/buy/delivery/addresses/add");
    }
  }, [personalInfo, shippingAddress, billingAddress]);

  useEffect(() => {
    fetchCart();
  }, []);

  // This acts like navigation guard, until a standard implemtion is done
  useEffect(() => {
    if (
      router.route === "/buy/delivery/methods" &&
      shippingMethod &&
      shippingMethod?.type
    ) {
      router.push("addresses/add");
    } else if (
      router.route === "/buy/delivery/addresses/add" &&
      shippingMethod &&
      shippingMethod?.type
    ) {
      // router.push("/buy/delivery/addresses");
    } else if (
      router.route === "/buy/delivery/addresses" &&
      shippingMethod &&
      shippingMethod?.type
    ) {
      // router.push("/buy/delivery/addresses");
    }
  }, [router, shippingMethod]);

  const addItemToCart = async (newProduct: AddProductToCartProductType) => {
    try {
      if (!newProduct.id || !newProduct.qty || loading) return;
      if (!cartId) {
        createCart();
      }
      setLoading(true);
      let payload = {
        product_id: newProduct.id,
        quantity: newProduct.qty,
        selectedOptions: newProduct?.selectedOptions,
      };

      const response = await axios.post(
        `${SERVER_BASE_URL}/api/cart/${cartId}`,
        payload
      );

      if (response.data.error) {
        throw new Error(response.data.error);
      }
      await fetchCart();
      toast("Product added successfully!");
    } catch (error) {
      const errorMessage = extractErrorMessage(error as AxiosError);
      if (errorMessage && errorMessage.includes("Cart not found")) {
        await checkCart();
      } else {
        toast.error(errorMessage || "Error adding product to cart.");
      }
    } finally {
      setLoading(false);
    }
  };

  const saveAddress = async ({
    personalInfo,
    shippingAddress,
  }: {
    personalInfo: PersonalInfoType;
    shippingAddress: AddressType;
  }) => {
    try {
      const storedCartId = getCookie("cart-id");

      if (!storedCartId) {
        throw new Error("Cart ID is missing.");
      }

      setLoading(true);

      const response = await axios.put(`/api/cart/${storedCartId}`, {
        shipping_address: shippingAddress,
        billing_address: shippingAddress,
        personal_information: personalInfo,
      });

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      fetchCart();
    } catch (error) {
      const errorMessage = extractErrorMessage(error as AxiosError);
      if (errorMessage && errorMessage.includes("Cart not found")) {
        await checkCart();
      } else {
        toast.error(errorMessage || "Error submitting the address");
      }
    } finally {
      setLoading(false);
    }
  };

  const checkCart = async () => {
    if (!cartId) return;

    try {
      const response = await axios.get(
        `${SERVER_BASE_URL}/api/cart/exists/${cartId}`
      );
      if (!response.data.exists) {
        deleteCookie("cart-id");
      }
      clearCart();
    } catch (error) {
      console.error("Error clearing the cart: ", error);
    }
  };

  const clearCart = () => {
    //TODO clear the cart everything import like shipping, cart amount etc
    //   CLEAR_CART(state) {
    //     state.cart = [];
    //     state.shipping = 0;
    //     state.cartTotal = 0;
    //     state.cartSubTotal = 0;
    //   },
  };

  const createCart = async () => {
    if (cartId) return;
    try {
      setLoading(true);

      const response = await axios.post(
        `${SERVER_BASE_URL}/api/cart/create_cart`
      );

      if (response.data.error || !response.data.id) return;

      setCartId(response.data.id);
      setCookie("cart-id", response.data.id);
    } catch (error) {
      const errorMessage = extractErrorMessage(error as AxiosError);
      toast.error(errorMessage || "Error creating a cart");
    } finally {
      setLoading(false);
    }
  };

  const deleteFromCart = async (productId: string) => {
    try {
      if (!productId || loading || !cartId) return;

      setLoading(true);

      let payload = {
        product_id: productId,
        cart_id: cartId,
      };

      const response = await axios.post(
        `${SERVER_BASE_URL}/api/cart/remove_product`,
        payload
      );

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      await fetchCart();

      toast("Product added successfully!");
    } catch (error) {
      const errorMessage = extractErrorMessage(error as AxiosError);
      if (errorMessage && errorMessage.includes("Cart not found")) {
        await checkCart();
      } else {
        toast.error(errorMessage || "Error removing product from the cart.");
      }
    } finally {
      setLoading(false);
    }
  };

  const resetShippingMethod = () => {
    setShippingMethod({});
  };

  const fetchCart = async () => {
    try {
      const storedCartId = getCookie("cart-id");

      if (!storedCartId) return;

      setCartId(storedCartId);

      setLoading(true);

      const response = await axios.get(
        `${SERVER_BASE_URL}/api/cart/${storedCartId}`
      );

      if (!response.data) return;

      setCart(response.data.cart_items);
      setShippingAddress(response.data.shipping_address);
      setBillingAddress(response.data.billing_address);
      setCartSubTotal(response.data.cart_subtotal);
      setCartTotal(response.data.cart_total);
      setShipping(response.data.cart_shipping);
      setPersonalInfo(response.data.personal_information);
      setShippingMethod(response.data?.shipping_method);
    } catch (error) {
      const errorMessage = extractErrorMessage(error as AxiosError);

      if (errorMessage && errorMessage.includes("Cart not found")) {
        await checkCart();
      } else {
        toast.error(errorMessage || "Error fetching the cart.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        shipping,
        shippingMethod,
        cartTotal,
        cartSubTotal,
        cartId,
        loading,
        personalInfo,
        billingAddress,
        shippingAddress,
        saveAddress,
        addItemToCart,
        resetShippingMethod,
        deleteFromCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a cartProvider");
  }
  return context;
};
