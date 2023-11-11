import { Product } from './product.model';

export interface Cart {
  items: CartItem[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}