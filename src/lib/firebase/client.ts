import { getAuth, type Auth } from "firebase/auth";
import { getApp, getApps, initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const PRODUCTS_COLLECTION = "delicias-productos";
export const PRODUCTS_STORAGE_PREFIX = "delicias-productos";

function assertFirebaseConfig(): void {
  const missing = (
    [
      ["apiKey", "NEXT_PUBLIC_FIREBASE_API_KEY"],
      ["authDomain", "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"],
      ["projectId", "NEXT_PUBLIC_FIREBASE_PROJECT_ID"],
      ["storageBucket", "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"],
      ["appId", "NEXT_PUBLIC_FIREBASE_APP_ID"],
    ] as const
  )
    .filter(([key]) => !firebaseConfig[key])
    .map(([, envKey]) => envKey);

  if (missing.length > 0) {
    throw new Error(`Faltan variables de Firebase: ${missing.join(", ")}`);
  }
}

export function isFirebaseConfigured(): boolean {
  return Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.authDomain &&
      firebaseConfig.projectId &&
      firebaseConfig.storageBucket &&
      firebaseConfig.appId,
  );
}

let app: FirebaseApp | undefined;
let db: Firestore | undefined;
let storage: FirebaseStorage | undefined;
let auth: Auth | undefined;

export function getFirebaseApp(): FirebaseApp {
  if (typeof window === "undefined") {
    throw new Error("Firebase client solo está disponible en el navegador.");
  }

  if (!app) {
    assertFirebaseConfig();
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  }

  return app;
}

export function getFirestoreDb(): Firestore {
  if (!db) {
    db = getFirestore(getFirebaseApp());
  }
  return db;
}

export function getFirebaseStorage(): FirebaseStorage {
  if (!storage) {
    storage = getStorage(getFirebaseApp());
  }
  return storage;
}

export function getFirebaseAuth(): Auth {
  if (!auth) {
    auth = getAuth(getFirebaseApp());
  }
  return auth;
}
