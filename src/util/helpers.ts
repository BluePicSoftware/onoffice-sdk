import { createHmac } from "crypto" 



export function hmac(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest().toString('base64') as string;
}