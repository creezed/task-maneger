import { compare } from 'bcryptjs';

export async function compareHashAsync(
  password: string,
  hashPassword: string
): Promise<boolean> {
  return compare(password, hashPassword);
}
