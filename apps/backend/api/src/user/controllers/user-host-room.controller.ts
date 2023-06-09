import { Body, Controller, Delete, HttpStatus, Param, Post, UseGuards } from '@nestjs/common'
import { UserHostRoomService } from '../services/user-host-room.service'
import { GetCurrentUser, JwtAuthGuard } from '@practica/api/auth'
import { CreateRoomDto } from '../../room/dto/create-room.dto'
import { JwtPayload } from '@practica/api/types'
import { DeleteResult } from 'typeorm'

@Controller()
export class UserHostRoomController {
    constructor(private readonly userHostRoomService: UserHostRoomService) {}

    @Post('user/create-room')
    @UseGuards(JwtAuthGuard)
    createRoom(@Body() createRoomDto: CreateRoomDto, @GetCurrentUser() { userId }: JwtPayload): Promise<HttpStatus> {
        return this.userHostRoomService.createRoom(createRoomDto, userId)
    }

    @Delete('user/delete-room/:id')
    @UseGuards(JwtAuthGuard)
    deleteRoom(@GetCurrentUser() { userId }: JwtPayload, @Param('id') id: string): Promise<DeleteResult> {
        return this.userHostRoomService.removeRoom(+id, userId)
    }
}
