import { UserModel } from '../../models/user-model';

export type RegistrationParams = Omit<UserModel, 'id'>;
