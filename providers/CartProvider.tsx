import React, { createContext, useState, useContext } from "react";

type CartItem = {
  id: string;
  name: string;
  // other fields
};

type ListItems = {
  // define the shape of your list items here
};

type CartProviderProps = {
  children: React.ReactNode;
};

type CartContextType = {
  cart: CartItem[];
  list: ListItems[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  addToList: (item: ListItems) => void;
  removeFromList: (id: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [list, setList] = useState<ListItems[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const addToList = (item: ListItems) => {
    setList((prevList) => [...prevList, item]);
  };

  const removeFromList = (id: string) => {
    // @ts-ignore
    // TODO add types
    setList((prevList) => prevList.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        list,
        addToCart,
        removeFromCart,
        addToList,
        removeFromList,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
