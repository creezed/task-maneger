import { UserModel } from '../../models/user-model'

export type LoginParams = Omit<UserModel, 'id' | 'username'>
