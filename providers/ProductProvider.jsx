import React, { createContext, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { mapSortOptionToFieldAndDirection } from "../utils/mapSortOptionToFieldAndDirection";
import { ImageService } from "../utils/ImageService";
import { generateRandomProduct } from "../utils/data";
import { toast } from "react-toastify";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [list, setList] = useState([]);

  const fetchProduct = async (productId) => {
    if (!productId) return;
    try {
      setIsLoading(true);
      const { data: product, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single();

      if (error) throw new Error(error);
      product.image = ImageService.generateURL(product.image);
      setProduct({ ...generateRandomProduct(), ...product });
    } catch (error) {
      toast.error(`Failed to fetch product id: ${productId}`);
      console.error("Error fetching product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProducts = async ({ sortOption, searchQuery }) => {
    try {
      if (isLoading) return;
      setIsLoading(true);

      const { sortField, sortDirection } =
        mapSortOptionToFieldAndDirection(sortOption);

      let query = supabase.from("products").select("*").eq("is_active", true);

      if (searchQuery) {
        query = query.or(
          `name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,category.ilike.%${searchQuery}%`
        );
      }

      query = query.order(sortField, { ascending: sortDirection === "asc" });

      const { data: products, error } = await query;

      if (error) {
        console.log("Supabase Error:", error);
        throw new Error(error.message);
      }

      if (!products) {
        console.log("Products is undefined");
        return;
      }

      for (const product of products) {
        try {
          product.image = ImageService.generateURL(product.image);
        } catch (imageError) {
          console.error(`Failed to process image: ${imageError}`);
        }
      }

      setProducts(
        products.map((pr) => ({ ...generateRandomProduct(), ...pr }))
      );
    } catch (error) {
      toast.error(`Failed to fetch products`);
      console.error(`Failed to fetch products: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const addItemToCart = (product) => {
    setCart((prev) => [product, ...prev]);
  };

  const addItemToList = (product) => {
    setList((prev) => [product, ...prev]);
  };

  const deleteFromCart = (id) => {
    setCart((prev) => prev.filter((x) => x.id !== id));
  };

  const deleteFromList = (id) => {
    // toast("Item removed from Wish List");
    setList((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <ProductContext.Provider
      value={{
        fetchProduct,
        fetchProducts,
        deleteFromList,
        deleteFromCart,
        addItemToCart,
        addItemToList,
        products,
        product,
        cart,
        list,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
