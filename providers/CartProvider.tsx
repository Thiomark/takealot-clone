import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { getCookie, deleteCookie } from "cookies-next";
import { supabase } from "../utils/supabaseClient";
import { toast } from "react-toastify";
import { CartItemType, ProductType } from "../types";

type CartContextType = {
  cart: CartItemType[];
  addToCart: (product: ProductType) => void;
  fetchCart: (cartId: string) => Promise<void>;
  removeFromCart: (SelectProduct: ProductType) => void;
};

type CartProviderProps = {
  children: ReactNode;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItemType[]>([]);

  useEffect(() => {
    const cartIdFromCookie = getCookie("cart_id");
    if (!cartIdFromCookie) return;

    const checkCartExistsAndFetch = async () => {
      try {
        const { data: cartExists, error } = await supabase.rpc(
          "does_cart_exist",
          {
            cart_id_to_check: cartIdFromCookie,
          }
        );

        if (error) throw error;
        if (!cartExists) {
          deleteCookie("cart_id");
          return;
        }

        fetchCart(cartIdFromCookie);
      } catch (error: any) {
        toast.error(`Error: ${error.message}`);
        deleteCookie("cart_id");
      }
    };

    checkCartExistsAndFetch();
  }, []);

  const addToCart = (newProduct: ProductType) => {
    setCart((prevCart) => {
      // const existingProduct = prevCart.find(
      //   (product) => product.product_id === newProduct.id
      // );
      // if (existingProduct) {
      //   // If it exists, increase the quantity
      //   return prevCart.map((product) =>
      //     product.product_id === newProduct.id
      //       ? { ...product, qty: product.quantity + 1 }
      //       : product
      //   );
      // }
      // return [...prevCart, { ...newProduct, quantity: 1 }];
      return [];
    });
  };

  const removeFromCart = (SelectProduct: ProductType) => {
    setCart((prevCart) => {
      const newArray = prevCart.filter(
        (product) => product.product_id !== SelectProduct.id
      );
      return newArray;
    });
  };

  const fetchCart = async (cartId: string) => {
    try {
      const { data, error } = await supabase
        .from("cart_items")
        .select("*, products(*)")
        .eq("cart_id", cartId);

      if (error) throw error;
      if (data) setCart(data);
    } catch (error: any) {
      toast.error(`Error fetching cart: ${error.message}`);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, fetchCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
