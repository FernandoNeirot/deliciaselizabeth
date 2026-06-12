import { readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

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

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY;

if (!projectId || !clientEmail || !privateKey) {
  console.error("Faltan credenciales de Firebase en .env");
  process.exit(1);
}

const credentialsPath = resolve(process.cwd(), ".firebase-service-account.json");
writeFileSync(
  credentialsPath,
  JSON.stringify(
    {
      type: "service_account",
      project_id: projectId,
      client_email: clientEmail,
      private_key: privateKey,
    },
    null,
    2,
  ),
);

const result = spawnSync(
  "npx",
  ["firebase-tools", "deploy", "--only", "firestore:rules,storage", "--project", projectId, "--force"],
  {
    stdio: "inherit",
    shell: true,
    env: {
      ...process.env,
      GOOGLE_APPLICATION_CREDENTIALS: credentialsPath,
    },
  },
);

try {
  unlinkSync(credentialsPath);
} catch {
  /* ignore */
}

process.exit(result.status ?? 1);
