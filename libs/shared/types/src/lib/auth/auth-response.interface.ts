import { UserModel } from '@practica/shared/models';

export interface AuthResponse {
  user: Omit<UserModel, 'password'>;
  token: string;
}
