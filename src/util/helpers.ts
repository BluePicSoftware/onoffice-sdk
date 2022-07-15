import HmacSHA256 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';

export function hmac(value: string, secret: string) {
  //this is the only way I've found to emulate php hash_hmac in binary mode
  return HmacSHA256(value, secret).toString(Base64);
}
