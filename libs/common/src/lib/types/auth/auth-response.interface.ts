import { UserModel } from '../../models/user-model';

export interface AuthResponse {
  user: Omit<UserModel, 'password'>;
  token: string;
}
