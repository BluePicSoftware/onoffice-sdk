import CryptoJS from 'crypto-js';

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

export function hmac(value: string, secret: string) {
  return CryptoJS.HmacSHA256(value, secret).toString(CryptoJS.enc.Base64);
}
