import CryptoJS from 'crypto-js';

export function hmac(value: string, secret: string) {
  //this is the only way I've found to emulate php hash_hmac in binary mode
  return CryptoJS.HmacSHA256(value, secret).toString(CryptoJS.enc.Base64);
}
