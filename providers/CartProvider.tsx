import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { setCookie, deleteCookie, getCookie } from "cookies-next";
import { toast } from "react-toastify";
import { AddProductToCartProductType } from "@/types/product";
import { SERVER_BASE_URL } from "@/config/index";
import extractErrorMessage, { AxiosError } from "@/utils/extractErrorMessage";
import { AddressType, CartContextType } from "@/types/cart";
import { PersonalInfoType } from "@/types/profile";
import firebaseApp from "@/firebase";
import { getAuth, signInAnonymously } from "firebase/auth";
import axiosWithAuth from "@/utils/axiosWithAuth";

const CartContext = createContext<CartContextType | undefined>(undefined);

const defaultPersonalInfo: PersonalInfoType = {
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
};

const defaultAddress: AddressType = {
  complex_or_building: "",
  street_address: "",
  suburb: "",
  city_or_town: "",
  address_type: "",
  province: "",
  post_code: "",
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const auth = getAuth(firebaseApp);

  const [loading, setLoading] = useState<boolean>(true);
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState("");
  const [shipping, setShipping] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const [shippingMethod, setShippingMethod] = useState<{ type?: string }>({});
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoType>({
    ...defaultPersonalInfo,
  });
  const [shippingAddress, setShippingAddress] = useState<AddressType>({
    ...defaultAddress,
  });
  const [billingAddress, setBillingAddress] = useState<AddressType>({
    ...defaultAddress,
  });

  useEffect(() => {
    fetchCart();
  }, []);

  const addItemToCart = async (newProduct: AddProductToCartProductType) => {
    try {
      if (!newProduct.id || !newProduct.qty || loading) return;
      if (!cartId) {
        await createCart();
      }
      setLoading(true);
      let payload = {
        product_id: newProduct.id,
        quantity: newProduct.qty,
        selectedOptions: newProduct?.selectedOptions,
      };

      const storedCartId = getCookie("cart-id");

      const response = await axiosWithAuth.post(
        `${SERVER_BASE_URL}/api/cart/${storedCartId}`,
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

      const response = await axiosWithAuth.put(`/api/cart/${storedCartId}`, {
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
      const response = await axiosWithAuth.get(
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
    setLoading(true);

    try {
      // Ensure there is a user, either logged in or anonymously
      if (!auth.currentUser) {
        await signInAnonymously(auth);
      }

      // Check again if currentUser is not null after signInAnonymously
      if (!auth.currentUser) {
        throw new Error("Authentication failed");
      }

      const response = await axiosWithAuth.post(
        `${SERVER_BASE_URL}/api/cart/create_cart`,
        {}
      );

      if (response.data.error || !response.data.id) {
        throw new Error("Failed to create cart");
      }

      setCartId(response.data.id);
      setCookie("cart-id", response.data.id); // Assuming setCookie is a function you have for setting cookies
    } catch (error) {
      // Handle errors, including errors from signInAnonymously, getIdToken, or the API call
      console.error(error);
      toast.error("Error creating a cart");
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

      const response = await axiosWithAuth.post(
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

  const resetShippingAddress = () => {
    setShippingAddress(defaultAddress);
  };

  const fetchCart = async () => {
    try {
      const storedCartId = getCookie("cart-id");

      if (!storedCartId) return;

      setCartId(storedCartId);

      setLoading(true);

      const response = await axiosWithAuth.get(
        `${SERVER_BASE_URL}/api/cart/${storedCartId}`
      );

      if (!response.data) return;

      if (response.data?.cart_items) {
        setCart(response.data.cart_items);
      }
      if (response.data?.shipping_address) {
        setShippingAddress(response.data.shipping_address);
      }
      if (response.data?.billing_address) {
        setBillingAddress(response.data.billing_address);
      }
      if (response.data?.cart_subtotal) {
        setCartSubTotal(response.data.cart_subtotal);
      }
      if (response.data?.cart_total) {
        setCartTotal(response.data.cart_total);
      }
      if (response.data?.cart_shipping) {
        setShipping(response.data.cart_shipping);
      }
      if (response.data?.personal_information) {
        setPersonalInfo(response.data.personal_information);
      }
      if (response.data?.shipping_method) {
        setShippingMethod(response.data.shipping_method);
      }
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
        resetShippingAddress,
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
