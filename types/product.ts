export interface ProductType {
  id?: string;
  countInStock: number;
  price: number;
  description: string;
  oldPrice?: number;
  sale?: number;
  featured: boolean;
  disabled: boolean;
  image: string;
  options: {
    sizes: string;
    colours: string;
  };
  images?: string[];
  name: string;
  [key: string]: any;
}

export interface ProductServerResponseType extends ProductType {
  category: Array<string>;
  brand: string;
  oldPrice: number;
  sale: number;
  rating: string;
  reviews: number;
  inStock: Array<string>;
  summary: string;
  productInfo: {
    categories: string;
    warranty: string;
    Platform: string;
    Barcode: number;
  };
}

export type SelectedOptions = {
  colour?: string;
  size?: string;
};

export interface AddProductToCartProductType {
  id: string;
  qty?: number;
  selectedOptions?: any;
}
