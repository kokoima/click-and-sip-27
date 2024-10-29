export interface Establishment {
  id: string;
  name: string;
  images: string[];
  description: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  name: string;
  options: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariants?: Record<string, string>;
}

export interface Zone {
  id: string;
  name: string;
  type: 'table' | 'pickup';
}