import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase/client";

const USERNAME_DOMAIN = "delicias.local";

function toEmail(username: string): string {
  const value = username.trim();
  return value.includes("@") ? value : `${value.toLowerCase()}@${USERNAME_DOMAIN}`;
}

function mapAuthError(code: string): string {
  if (code === "auth/invalid-credential" || code === "auth/wrong-password" || code === "auth/user-not-found") {
    return "Invalid login credentials";
  }
  return code;
}

export async function signIn(username: string, password: string): Promise<{ error?: string }> {
  try {
    await signInWithEmailAndPassword(getFirebaseAuth(), toEmail(username), password);
    return {};
  } catch (error) {
    const code = error instanceof Error && "code" in error ? String((error as { code?: string }).code) : "";
    return { error: mapAuthError(code) || "No se pudo iniciar sesión." };
  }
}

export async function signOut(): Promise<void> {
  await firebaseSignOut(getFirebaseAuth());
}

export function subscribeAuth(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(getFirebaseAuth(), callback);
}

export type { User as AuthUser };
