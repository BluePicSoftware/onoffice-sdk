import CryptoJS from 'crypto-js';

export function detectEnv() {
  if (typeof window !== "undefined" && typeof window.document !== "undefined") {
    return "browser";
  } else {
    return "node";
  }
}

// still needed?
export const webcrypto = new Promise(async (resolve) => {
  if (detectEnv() === "node") {
    // @ts-expect-error no dynamic imports
    import("crypto").then((cryptoModule) => resolve(cryptoModule.webcrypto));
  } else {
    resolve(window.crypto);
  }
}) as Promise<Crypto>;

export function hmac(value: string, secret: string) {
  //this is the only way I've found to emulate php hash_hmac in binary mode
  return CryptoJS.HmacSHA256(value, secret).toString(CryptoJS.enc.Base64);
}
