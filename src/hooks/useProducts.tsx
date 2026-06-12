"use client";

import { useEffect, useState } from "react";
import { products as baseProducts, type Product } from "@/data/products";
import {
  createProduct,
  deleteProduct,
  subscribeToProducts,
  updateProduct,
  type ProductInput,
} from "@/services/productService";

export function useCustomProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    const unsubscribe = subscribeToProducts(
      (items) => {
        setProducts(items);
        setLoading(false);
        setError(null);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
    );

    return unsubscribe;
  }, []);

  return { products, loading, error };
}

export function useProducts() {
  const { products: custom, loading } = useCustomProducts();

  if (loading) {
    return baseProducts;
  }

  return [...baseProducts, ...custom];
}

export async function addCustomProduct(input: ProductInput): Promise<Product> {
  return createProduct(input);
}

export async function updateCustomProduct(
  id: string,
  input: ProductInput,
  previousImage?: string,
): Promise<Product> {
  return updateProduct(id, input, previousImage);
}

export async function removeCustomProduct(id: string): Promise<void> {
  return deleteProduct(id);
}
