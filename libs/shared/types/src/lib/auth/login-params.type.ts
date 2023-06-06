import { UserModel } from '@practica/shared/models';

export type LoginParams = Omit<UserModel, 'id' | 'username'>;
