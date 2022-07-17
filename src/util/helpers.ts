import crypto from 'crypto-js';

export function hmac(value: string, secret: string) {
  //this is the only way I've found to emulate php hash_hmac in binary mode
  return crypto.HmacSHA256(value, secret).toString(crypto.enc.Base64);
}
