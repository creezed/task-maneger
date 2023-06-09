import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Room } from '../entities/room.entity'
import { DeleteResult, FindOneOptions, FindOptionsRelations, Repository } from 'typeorm'
import { CreateRoomDto } from '../dto/create-room.dto'
import { UserService } from '../../user/services/user.service'
import { hashPasswordAsync } from '@practica/api/shared'

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
        private readonly userService: UserService
    ) {}

    findAll(): Promise<Room[]> {
        return this.roomRepository.find()
    }

    findById(id: number, relations?: FindOptionsRelations<Room>): Promise<Room | null> {
        return this.roomRepository.findOne({ where: { id }, relations })
    }

    findOne(options: FindOneOptions<Room>): Promise<Room | null> {
        return this.roomRepository.findOne(options)
    }

    async saveRoom(room: Room): Promise<Room> {
        return this.roomRepository.save(room)
    }
    async create(createRoomDto: CreateRoomDto, userId: number): Promise<HttpStatus> {
        const user = await this.userService.findOneById(userId)
        if (!user) {
            throw new NotFoundException('Пользователь не найден')
        }
        const room = this.roomRepository.create({
            ...createRoomDto,
            host: user,
            users: [user],
            password: await hashPasswordAsync(createRoomDto.password),
        })
        await this.roomRepository.save(room)
        return HttpStatus.OK
    }

    async delete(roomId: number): Promise<DeleteResult> {
        return this.roomRepository.delete({ id: roomId })
    }
}
