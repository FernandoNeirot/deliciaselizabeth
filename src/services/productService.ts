import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  type DocumentData,
  type Unsubscribe,
} from "firebase/firestore";
import type { Product } from "@/data/products";
import {
  getFirestoreDb,
  isFirebaseConfigured,
  PRODUCTS_COLLECTION,
} from "@/lib/firebase/client";

export type ProductInput = Omit<Product, "id" | "createdAt">;

function parseTimestamp(value: unknown): string | undefined {
  if (!value) return undefined;
  if (typeof value === "string") return value;
  if (typeof value === "object" && value !== null && "toDate" in value) {
    return (value as { toDate: () => Date }).toDate().toISOString();
  }
  return undefined;
}

function docToProduct(id: string, data: DocumentData): Product {
  return {
    id,
    name: String(data.name ?? ""),
    description: String(data.description ?? ""),
    price: String(data.price ?? ""),
    image: String(data.image ?? ""),
    category: String(data.category ?? "Tortas"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    useInHero: Boolean(data.useInHero),
    useInAbout: Boolean(data.useInAbout),
    createdAt: parseTimestamp(data.createdAt),
  };
}

function sortByNewest(products: Product[]): Product[] {
  return [...products].sort((a, b) => {
    const aTime = a.createdAt ? Date.parse(a.createdAt) : 0;
    const bTime = b.createdAt ? Date.parse(b.createdAt) : 0;
    return bTime - aTime;
  });
}

export function subscribeToProducts(
  onData: (products: Product[]) => void,
  onError?: (error: Error) => void,
): Unsubscribe {
  if (!isFirebaseConfigured()) {
    onError?.(
      new Error(
        "Faltan variables de Firebase. Agregá NEXT_PUBLIC_FIREBASE_* en .env.local y reiniciá el servidor.",
      ),
    );
    return () => undefined;
  }

  return onSnapshot(
    collection(getFirestoreDb(), PRODUCTS_COLLECTION),
    (snapshot) => {
      onData(sortByNewest(snapshot.docs.map((item) => docToProduct(item.id, item.data()))));
    },
    (error) => {
      onError?.(error);
    },
  );
}

export async function createProduct(input: ProductInput): Promise<Product> {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase no está configurado.");
  }

  if (!input.image) {
    throw new Error("La imagen del producto es obligatoria.");
  }

  const docRef = await addDoc(collection(getFirestoreDb(), PRODUCTS_COLLECTION), {
    name: input.name,
    description: input.description,
    price: input.price,
    image: input.image,
    category: input.category,
    tags: input.tags ?? [],
    useInHero: input.useInHero ?? false,
    useInAbout: input.useInAbout ?? false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return {
    id: docRef.id,
    ...input,
  };
}

export async function updateProduct(id: string, input: ProductInput): Promise<Product> {
  if (!input.image) {
    throw new Error("La imagen del producto es obligatoria.");
  }

  await updateDoc(doc(getFirestoreDb(), PRODUCTS_COLLECTION, id), {
    name: input.name,
    description: input.description,
    price: input.price,
    image: input.image,
    category: input.category,
    tags: input.tags ?? [],
    useInHero: input.useInHero ?? false,
    useInAbout: input.useInAbout ?? false,
    updatedAt: serverTimestamp(),
  });

  return {
    id,
    ...input,
  };
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(getFirestoreDb(), PRODUCTS_COLLECTION, id));
}
