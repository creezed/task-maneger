import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { RoomService } from '../../room/services/room.service'
import { UserService } from './user.service'
import { CreateRoomDto } from '../../room/dto/create-room.dto'
import { DeleteResult } from 'typeorm'

@Injectable()
export class UserHostRoomService {
    constructor(private readonly roomService: RoomService, private readonly userService: UserService) {}

    createRoom(createRoomDto: CreateRoomDto, userId: number): Promise<HttpStatus> {
        return this.roomService.create(createRoomDto, userId)
    }

    async removeRoom(roomId: number, userId: number): Promise<DeleteResult> {
        const room = await this.roomService.findById(roomId)
        if (!room) {
            throw new NotFoundException('Комната не найдена')
        }
        const user = await this.userService.findOneById(userId)
        if (!user) {
            throw new NotFoundException('Пользователь не найден')
        }
        const userHostTheRoom = await this.roomService.findOne({ where: { id: roomId, host: { id: userId } } })

        if (!userHostTheRoom) {
            throw new BadRequestException('Пользователь не хост комнаты')
        }

        return this.roomService.delete(roomId)
    }
}
