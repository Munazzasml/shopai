// src/types/index.ts

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
  stock: number;
  tags: string[];
}

// CartItem "extends" Product, meaning it gets all the fields from Product, 
// PLUS the new quantity field!
export interface CartItem extends Product {
  quantity: number;
}