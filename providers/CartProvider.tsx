import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";
import { ProductType } from "@/types/product";

interface CartContextType {
  loading: boolean;
  cart: Array<ProductType>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [cart, setCart] = useState([]);
  const [list, setList] = useState([]);

  const addItemToCart = (product: any) => {
    setCart((prev) => [product, ...prev] as any);
  };

  const addItemToList = (product: any) => {
    setList((prev: any) => [product, ...prev] as any);
  };

  const deleteFromCart = (id: any) => {
    setCart((prev) => prev.filter((x: any) => x.id !== id));
  };

  const deleteFromList = (id: any) => {
    // toast("Item removed from Wish List");
    setList((prev) => prev.filter((x: any) => x.id !== id));
  };

  const value = {
    cart,
    list,
    loading,
    deleteFromList,
    deleteFromCart,
    addItemToCart,
    addItemToList,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a cartProvider");
  }
  return context;
};
