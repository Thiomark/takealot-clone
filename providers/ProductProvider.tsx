import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import axios from "axios";
import { ProductType } from "@/types/product";

interface ProductContextType {
  products: ProductType[];
  product: ProductType | null;
  loading: boolean;
  fetchProduct: (productId: string) => Promise<void>;
  fetchProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<ProductType | null>(null);

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

  const fetchProduct = async (productId: string) => {
    setLoading(true);
    try {
      setProduct(null);
      const response = await axios.get(`/api/products/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      // Handle error appropriately
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    products,
    product,
    loading,
    fetchProduct,
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
