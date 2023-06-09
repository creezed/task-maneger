import { UserModel } from './user-model'

export interface RoomModel {
    id: number
    name: string
    host: UserModel
    users: UserModel[]
}
