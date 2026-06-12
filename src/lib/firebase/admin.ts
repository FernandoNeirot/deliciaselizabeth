import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getStorage, type Storage } from "firebase-admin/storage";

const PEM_BEGIN = "-----BEGIN PRIVATE KEY-----";
const PEM_END = "-----END PRIVATE KEY-----";

function normalizePrivateKey(key: string): string {
  let out = key
    .replace(/\\\\n/g, "\\n")
    .replace(/\\n/g, "\n")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .trim();

  if (!out.includes(PEM_BEGIN) || !out.includes(PEM_END)) return out;

  const start = out.indexOf(PEM_BEGIN) + PEM_BEGIN.length;
  const end = out.indexOf(PEM_END);
  const base64 = out.slice(start, end).replace(/\s/g, "");
  if (!base64 || !/^[A-Za-z0-9+/=]+$/.test(base64)) return out;

  const lines = base64.match(/.{1,64}/g) ?? [base64];
  return `${PEM_BEGIN}\n${lines.join("\n")}\n${PEM_END}\n`;
}

let adminApp: App | undefined;
let adminStorage: Storage | undefined;

export function initializeAdminApp(): App {
  if (getApps().length > 0) {
    return getApps()[0]!;
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  let clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !storageBucket) {
    throw new Error(
      "NEXT_PUBLIC_FIREBASE_PROJECT_ID y NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET deben estar configurados",
    );
  }

  if (clientEmail && privateKey) {
    privateKey = privateKey.trim();
    if (!privateKey.includes("-----BEGIN")) {
      try {
        const decoded = Buffer.from(privateKey, "base64").toString("utf-8");
        if (decoded.includes("-----BEGIN")) privateKey = decoded;
      } catch {
        /* no es base64 */
      }
    }
    privateKey = normalizePrivateKey(privateKey);
  }

  if (!clientEmail || !privateKey) {
    throw new Error(
      "Firebase Admin SDK requiere FIREBASE_CLIENT_EMAIL y FIREBASE_PRIVATE_KEY en .env",
    );
  }

  adminApp = initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
    storageBucket,
  });

  return adminApp;
}

export function getAdminStorage(): Storage {
  if (!adminStorage) {
    adminStorage = getStorage(initializeAdminApp());
  }
  return adminStorage;
}
