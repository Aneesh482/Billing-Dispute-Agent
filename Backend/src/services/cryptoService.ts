import crypto from "crypto";
import { settings } from "../config";

function key(): Buffer {
  return Buffer.from(settings.TOKEN_ENCRYPTION_KEY, "base64");
}

export function encryptToken(plainText: string): string {
  const nonce = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key(), nonce);
  const ciphertext = Buffer.concat([cipher.update(plainText, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return Buffer.concat([nonce, ciphertext, authTag]).toString("base64url");
}

export function decryptToken(encrypted: string): string {
  const raw = Buffer.from(encrypted, "base64url");
  const nonce = raw.subarray(0, 12);
  const authTag = raw.subarray(raw.length - 16);
  const ciphertext = raw.subarray(12, raw.length - 16);
  const decipher = crypto.createDecipheriv("aes-256-gcm", key(), nonce);
  decipher.setAuthTag(authTag);
  return Buffer.concat([decipher.update(ciphertext), decipher.final()]).toString("utf8");
}
