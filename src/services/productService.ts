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
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import type { Product } from "@/data/products";
import {
  getFirebaseStorage,
  getFirestoreDb,
  isFirebaseConfigured,
  PRODUCTS_COLLECTION,
  PRODUCTS_STORAGE_PREFIX,
} from "@/lib/firebase/client";

export type ProductInput = Omit<Product, "id">;

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
  };
}

function isDataUrl(value: string): boolean {
  return value.startsWith("data:");
}

async function dataUrlToBlob(dataUrl: string): Promise<Blob> {
  const response = await fetch(dataUrl);
  return response.blob();
}

async function uploadProductImage(productId: string, image: string): Promise<string> {
  if (!isDataUrl(image)) return image;

  const blob = await dataUrlToBlob(image);
  const extension = blob.type.includes("png") ? "png" : "jpg";
  const storageRef = ref(
    getFirebaseStorage(),
    `${PRODUCTS_STORAGE_PREFIX}/${productId}/cover.${extension}`,
  );

  await uploadBytes(storageRef, blob, { contentType: blob.type || "image/jpeg" });
  return getDownloadURL(storageRef);
}

async function deleteProductImages(productId: string): Promise<void> {
  for (const extension of ["jpg", "png", "webp"]) {
    try {
      await deleteObject(
        ref(getFirebaseStorage(), `${PRODUCTS_STORAGE_PREFIX}/${productId}/cover.${extension}`),
      );
    } catch {
      /* ignore missing files */
    }
  }
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
      const products = snapshot.docs
        .map((item) => docToProduct(item.id, item.data()))
        .sort((a, b) => a.name.localeCompare(b.name, "es"));
      onData(products);
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

  const docRef = await addDoc(collection(getFirestoreDb(), PRODUCTS_COLLECTION), {
    name: input.name,
    description: input.description,
    price: input.price,
    image: "",
    category: input.category,
    tags: input.tags ?? [],
    useInHero: input.useInHero ?? false,
    useInAbout: input.useInAbout ?? false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  const imageUrl = await uploadProductImage(docRef.id, input.image);

  await updateDoc(docRef, {
    image: imageUrl,
    updatedAt: serverTimestamp(),
  });

  return {
    id: docRef.id,
    ...input,
    image: imageUrl,
  };
}

export async function updateProduct(
  id: string,
  input: ProductInput,
  previousImage?: string,
): Promise<Product> {
  const imageUrl = isDataUrl(input.image)
    ? await uploadProductImage(id, input.image)
    : input.image;

  if (isDataUrl(input.image) && previousImage) {
    await deleteProductImages(id);
  }

  await updateDoc(doc(getFirestoreDb(), PRODUCTS_COLLECTION, id), {
    name: input.name,
    description: input.description,
    price: input.price,
    image: imageUrl,
    category: input.category,
    tags: input.tags ?? [],
    useInHero: input.useInHero ?? false,
    useInAbout: input.useInAbout ?? false,
    updatedAt: serverTimestamp(),
  });

  return {
    id,
    ...input,
    image: imageUrl,
  };
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteProductImages(id);
  await deleteDoc(doc(getFirestoreDb(), PRODUCTS_COLLECTION, id));
}
