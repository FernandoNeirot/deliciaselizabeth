import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import admin from "firebase-admin";

function loadEnvFile(path) {
  try {
    const content = readFileSync(path, "utf8");

    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const index = trimmed.indexOf("=");
      if (index === -1) continue;

      const key = trimmed.slice(0, index).trim();
      let value = trimmed.slice(index + 1).trim();

      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }

      if (!process.env[key]) {
        process.env[key] = value.replace(/\\n/g, "\n");
      }
    }
  } catch {
    /* optional env file */
  }
}

loadEnvFile(resolve(process.cwd(), ".env"));
loadEnvFile(resolve(process.cwd(), ".env.local"));

const adminUsername = process.env.ADMIN_USERNAME ?? "delicias-admin";
const adminPassword = process.env.ADMIN_PASSWORD;
const adminEmail = adminUsername.includes("@")
  ? adminUsername
  : `${adminUsername.toLowerCase()}@delicias.local`;

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY;

if (!projectId || !clientEmail || !privateKey) {
  console.error("Faltan FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY o NEXT_PUBLIC_FIREBASE_PROJECT_ID en .env");
  process.exit(1);
}

if (!adminPassword) {
  console.error("Definí ADMIN_PASSWORD antes de ejecutar el script.");
  process.exit(1);
}

admin.initializeApp({
  credential: admin.credential.cert({
    projectId,
    clientEmail,
    privateKey,
  }),
});

const auth = admin.auth();

async function main() {
  try {
    const existing = await auth.getUserByEmail(adminEmail);
    await auth.updateUser(existing.uid, {
      password: adminPassword,
      displayName: "Delicias Admin",
      emailVerified: true,
    });
    console.log(`Usuario actualizado: ${adminEmail}`);
  } catch (error) {
    if (error.code !== "auth/user-not-found") {
      throw error;
    }

    await auth.createUser({
      email: adminEmail,
      password: adminPassword,
      displayName: "Delicias Admin",
      emailVerified: true,
    });
    console.log(`Usuario creado: ${adminEmail}`);
  }

  console.log(`Ingresá en /admin con usuario "${adminUsername.split("@")[0]}"`);
}

main().catch((error) => {
  console.error("Error:", error.message || error);
  process.exit(1);
});
