import { genSalt, hash } from 'bcryptjs';

export async function hashPasswordAsync(password: string): Promise<string> {
  const salt = await genSalt();
  return hash(password, salt);
}
