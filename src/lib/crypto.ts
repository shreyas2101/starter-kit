import "server-only";
import bcrypt from "bcryptjs";

export async function hashString(str: string, salt = 10) {
  return await bcrypt.hash(str, salt);
}

export async function compareHash(str: string, hash: string) {
  return await bcrypt.compare(str, hash);
}
