import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { compareHashAsync } from '@practica/api/shared'
import { RoomService } from '../../room/services/room.service'
import { UserService } from './user.service'
import { Room } from '../../room/entities/room.entity'
import { User } from '../entities/user.entity'

@Injectable()
export class UserRoomService {
    constructor(private readonly roomService: RoomService, private readonly userService: UserService) {}

    async loginToTheRoomByPassword(roomId: number, userId: number, password: string): Promise<HttpStatus> {
        const { room, user } = await this.findRoomAndUser(roomId, userId)

        const findUserInThisRoom = await this.roomService.findOne({
            where: { id: roomId, users: { id: userId } },
        })

        if (findUserInThisRoom) {
            throw new NotFoundException('Пользователь уже есть в комнате')
        }

        const isValidPassword = await compareHashAsync(password, room.password)

        if (!isValidPassword) {
            throw new BadRequestException('Неверный пароль')
        }

        room.users.push(user)

        await this.roomService.saveRoom(room)
        return HttpStatus.OK
    }

    async getOutOfTheRoom(roomId: number, userId: number): Promise<HttpStatus> {
        const { room } = await this.findRoomAndUser(roomId, userId)
        const findUserInThisRoom = await this.roomService.findOne({
            where: { id: roomId, users: { id: userId } },
        })

        if (!findUserInThisRoom) {
            throw new NotFoundException('Пользователя нет в комнате')
        }

        room.users = room.users.filter((user) => user.id !== userId)

        await this.roomService.saveRoom(room)
        return HttpStatus.OK
    }

    private async findRoomAndUser(roomId: number, userId: number): Promise<{ room: Room; user: User }> {
        const room = await this.roomService.findById(roomId, { users: true })
        if (!room) {
            throw new NotFoundException('Комната не найдена')
        }
        const user = await this.userService.findOneById(userId)
        if (!user) {
            throw new NotFoundException('Пользователь не найден')
        }
        return { room, user }
    }
}
