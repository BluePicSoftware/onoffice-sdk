import { HmacSHA256, enc } from "crypto-js";

export function hmac(value: string, secret: string) {
  //this is the only way I've found to emulate php hash_hmac in binary mode
  return HmacSHA256(value, secret).toString(enc.Base64);
}
