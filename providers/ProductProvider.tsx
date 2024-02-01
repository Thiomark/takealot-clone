import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios from "axios";

interface Product {
  id: string;
  name: string;
  price: number;
  disabled?: boolean;
  [key: string]: any;
}

interface ProductContextType {
  products: Product[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [list, setList] = useState([]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/products`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      // Handle error appropriately
    } finally {
      setLoading(false);
    }
  };

  const fetchProduct = (product: any) => {
    setProduct(product);
  };

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

  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    products,
    product,
    cart,
    list,
    loading,
    fetchProduct,
    deleteFromList,
    deleteFromCart,
    addItemToCart,
    addItemToList,
    fetchProducts,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
