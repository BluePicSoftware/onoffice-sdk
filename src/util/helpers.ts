import { encode } from "base64-arraybuffer";

export function detectEnv() {
  if (typeof window !== "undefined" && typeof window.document !== "undefined") {
    return "browser";
  } else {
    return "node";
  }
}

export const webcrypto = new Promise(async (resolve) => {
  if (detectEnv() === "node") {
    // @ts-expect-error no dynamic imports
    import("crypto").then((cryptoModule) => resolve(cryptoModule.webcrypto));
  } else {
    resolve(window.crypto);
  }
}) as Promise<Crypto>;

// (await import('crypto')).createHmac("sha256", secret).update(value).digest().toString('base64')
export async function hmac(value: string, secret: string) {
  const crypto = await webcrypto;

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign", "verify"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(value)
  );

  return encode(signature);
}
