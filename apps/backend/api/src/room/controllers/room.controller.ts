import { Controller, Get, Param } from '@nestjs/common'
import { RoomService } from '../services/room.service'
import { instanceToPlain } from 'class-transformer'

@Controller()
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    @Get('rooms')
    getAllRooms(): Record<string, any> {
        return instanceToPlain(this.roomService.findAll())
    }

    @Get('room/:id')
    getOneRoom(@Param('id') id: string): Record<string, any> {
        return instanceToPlain(this.roomService.findById(+id))
    }
}
