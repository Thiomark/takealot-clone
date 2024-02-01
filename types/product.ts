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
  //   [key: string]: any;
}
