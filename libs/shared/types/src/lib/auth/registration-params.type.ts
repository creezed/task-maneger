import { UserModel } from '@practica/shared/models';

export type RegistrationParams = Omit<UserModel, 'id'>;
