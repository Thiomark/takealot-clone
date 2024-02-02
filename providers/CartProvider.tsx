import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";
import { setCookie, deleteCookie } from "cookies-next";
import { AddProductToCartProductType, ProductType } from "@/types/product";
import { toast } from "react-toastify";
import { SERVER_BASE_URL } from "@/config/index";
import extractErrorMessage, { AxiosError } from "@/utils/extractErrorMessage";
import { getCookie } from "cookies-next";

interface CartContextType {
  loading: boolean;
  cart: Array<ProductType>;
  cartId: string;
  fetchCart: () => Promise<void>;
  addItemToCart: (newProduct: AddProductToCartProductType) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState("");

  useEffect(() => {
    fetchCart();
  }, []);

  const addItemToCart = async (newProduct: AddProductToCartProductType) => {
    try {
      if (!newProduct.id || !newProduct.qty || loading) return;
      if (!cartId) {
        createCart();
      }
      setLoading(false);
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
      console.log();
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

  const checkCart = async () => {
    if (!cartId) return;

    try {
      const response = await axios.get(
        `${SERVER_BASE_URL}/api/cart/exists/${cartId}`
      );
      if (!response.data.exists) {
        deleteCookie("cart-id");
      }
      // clearCart
    } catch (error) {
      console.error("Error clearing the cart: ", error);
    }
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

      // commit("UPDATE_ADDRESSES", {
      //   shippingAddress: response.data.shipping_address,
      //   billingAddress: response.data.billing_address,
      // });
      setCart(response.data.cart_items);
      // commit("SET_CART_SUB_TOTAL", response.data.cart_subtotal);
      // commit("SET_CART_TOTAL", response.data.cart_total);
      // commit("SET_CART_SHIPPING", response.data.cart_shipping);
      // commit("SET_PERSONAL_INFO", response.data.personal_information);
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
        cartId,
        loading,
        addItemToCart,
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

// import Vue from "vue";

// const state = () => ({
//   cartId: null,
//   loading: false,
//   cart: [],
//   liked: [],
//   shipping: 0,
//   cartTotal: 0,
//   cartSubTotal: 0,
//   personalInfo: {
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone_number: "",
//   },
//   shippingAddress: {
//     complex_or_building: "",
//     street_address: "",
//     suburb: "",
//     city_or_town: "",
//     province: "",
//     post_code: "",
//   },
//   billingAddress: {
//     complex_or_building: "",
//     street_address: "",
//     suburb: "",
//     city_or_town: "",
//     province: "",
//     post_code: "",
//   },
// });

// const mutations = {
//   SET_LOADING: (state, loading) => {
//     state.loading = loading;
//   },
//   ADD_TO_LIKED: (state, newProduct) => {
//     const newArray = state.liked.filter(
//       (product) => product.id !== newProduct.id
//     );
//     state.liked = [newProduct, ...newArray];
//     localStorage.setItem(
//       "likedItems",
//       JSON.stringify([newProduct, ...newArray])
//     );
//   },
//   SEED_CART(state, cart) {
//     state.cart = cart;
//   },
//   SET_CART_ID(state, cardId) {
//     state.cartId = cardId;
//   },
//   SET_PERSONAL_INFO(state, personalInfo) {
//     state.personalInfo = personalInfo;
//   },
//   SET_CART_TOTAL(state, total) {
//     state.cartTotal = total;
//   },
//   SET_CART_SUB_TOTAL(state, total) {
//     state.cartSubTotal = total;
//   },
//   SET_CART_SHIPPING(state, total) {
//     state.shipping = total;
//   },
//   UPDATE_ADDRESSES(state, { shippingAddress, billingAddress }) {
//     state.shippingAddress = shippingAddress;
//     state.billingAddress = billingAddress;
//   },
//   REMOVE_FROM_LIKED: (state, SelectProduct) => {
//     const newArray = state.liked.filter(
//       (product) => product.id !== SelectProduct.id
//     );
//     state.liked = newArray;
//     localStorage.setItem("likedItems", JSON.stringify(newArray));
//   },
//   CLEAR_CART(state) {
//     state.cart = [];
//     state.shipping = 0;
//     state.cartTotal = 0;
//     state.cartSubTotal = 0;
//   },
// };

// const actions = {
//   async addToCart({ commit, state, dispatch }, newProduct) {
//     try {
//       if (!newProduct.id || !newProduct.qty || state.loading) return;

//       if (!state.cartId) {
//         await dispatch("createCart");
//       }

//       commit("SET_LOADING", true);

//       let payload = {
//         product_id: newProduct.id,
//         quantity: newProduct.qty,
//         selectedOptions: newProduct?.selectedOptions,
//       };

//       const serverBaseUrl = this.$runtimeConfig.serverBaseUrl;

//       const response = await this.$axios.post(
//         `${serverBaseUrl}/api/cart/${state.cartId}`,
//         payload
//       );

//       if (response.data.error) {
//         throw new Error(response.data.error);
//       }

//       await dispatch("fetchCart");

//       Vue.prototype.$toast.success("Product added successfully!");
//     } catch (error) {
//       const errorMessage = extractErrorMessage(error);
//       if (errorMessage && errorMessage.includes("Cart not found")) {
//         await dispatch("checkCart");
//       } else {
//         Vue.prototype.$toast.error(
//           errorMessage || "Error adding product to cart."
//         );
//       }
//     } finally {
//       commit("SET_LOADING", false);
//     }
//   },
//   async removeFromCart({ commit, state, dispatch }, SelectProduct) {
//     try {
//       if (!SelectProduct.id || state.loading || !state.cartId) return;

//       commit("SET_LOADING", true);

//       let payload = {
//         product_id: SelectProduct.id,
//         cart_id: state.cartId,
//       };

//       const serverBaseUrl = this.$runtimeConfig.serverBaseUrl;

//       const response = await this.$axios.post(
//         `${serverBaseUrl}/api/cart/remove_product`,
//         payload
//       );

//       if (response.data.error) {
//         throw new Error(response.data.error);
//       }

//       await dispatch("fetchCart");

//       Vue.prototype.$toast.success("Product added successfully!");
//     } catch (error) {
//       const errorMessage = extractErrorMessage(error);
//       if (errorMessage && errorMessage.includes("Cart not found")) {
//         await dispatch("checkCart");
//       } else {
//         Vue.prototype.$toast.error(
//           errorMessage || "Error removing product from the cart."
//         );
//       }
//     } finally {
//       commit("SET_LOADING", false);
//     }
//     commit("REMOVE_FROM_CART", SelectProduct);
//   },

//   async saveAddress(
//     { commit, state, dispatch },
//     { shippingAddress, billingAddress, personalInformation }
//   ) {
//     try {
//       // Check if the state has cartId
//       if (!state.cartId) {
//         throw new Error("Cart ID is missing.");
//       }

//       commit("SET_LOADING", true);

//       let payload = {
//         shipping_address: shippingAddress,
//         billing_address: billingAddress,
//         personal_information: personalInformation,
//       };

//       const serverBaseUrl = this.$runtimeConfig.serverBaseUrl;

//       const response = await this.$axios.put(
//         `${serverBaseUrl}/api/cart/${state.cartId}`,
//         payload
//       );

//       if (response.data.error) {
//         throw new Error(response.data.error);
//       }

//       await dispatch("fetchCart");

//       Vue.prototype.$toast.success("Address added successfully!");
//     } catch (error) {
//       const errorMessage = extractErrorMessage(error);
//       if (errorMessage && errorMessage.includes("Cart not found")) {
//         await dispatch("checkCart");
//       } else {
//         Vue.prototype.$toast.error(
//           errorMessage || "Error submitting the address"
//         );
//       }
//     } finally {
//       commit("SET_LOADING", false);
//     }
//   },
//   async setCartId({ commit }, cardId) {
//     commit("SET_CART_ID", cardId);
//   },
//   addToLiked({ commit }, newProduct) {
//     commit("ADD_TO_LIKED", newProduct);
//   },
//   removeFromLiked({ commit }, SelectProduct) {
//     commit("REMOVE_FROM_LIKED", SelectProduct);
//   },
//   clearCart({ commit }) {
//     commit("CLEAR_CART");
//   },
// };

// const getters = {
//   getCart: (state) => state.cart,
//   getCartTotal: (state) => state.cartTotal,
//   getCartSubTotal: (state) => state.cartSubTotal,
//   getLiked: (state) => state.liked,
//   getShipping: (state) => state.shipping,
//   getShippingAddress: (state) => state.shippingAddress,
//   getBillingAddress: (state) => state.billingAddress,
//   getPersonalInfo: (state) => state.personalInfo,
// };

// export default {
//   state,
//   getters,
//   mutations,
//   actions,
// };
