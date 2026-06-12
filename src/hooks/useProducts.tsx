"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/data/products";
import {
  createProduct,
  deleteProduct,
  subscribeToProducts,
  updateProduct,
  type ProductInput,
} from "@/services/productService";

export function useCustomProducts(enabled = true) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setProducts([]);
      setLoading(false);
      setError(null);
      return;
    }

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
  }, [enabled]);

  return { products, loading, error };
}

export async function addCustomProduct(input: ProductInput): Promise<Product> {
  return createProduct(input);
}

export async function updateCustomProduct(id: string, input: ProductInput): Promise<Product> {
  return updateProduct(id, input);
}

export async function removeCustomProduct(id: string): Promise<void> {
  return deleteProduct(id);
}
