import { Body, Controller, Get, HttpStatus, Param, Post, UseGuards } from '@nestjs/common'
import { UserRoomService } from '../services/user-room.service'
import { GetCurrentUser, JwtAuthGuard } from '@practica/api/auth'
import { JwtPayload } from '@practica/api/types'
import { LoginToTheRoomDto } from '../dto/login-to-the-room.dto'

@Controller()
export class UserRoomController {
    constructor(private readonly userRoomService: UserRoomService) {}

    @Post('user/room/:id/join')
    @UseGuards(JwtAuthGuard)
    loginToTheRoomByPassword(
        @Param('id') id: string,
        @GetCurrentUser() { userId }: JwtPayload,
        @Body() { password }: LoginToTheRoomDto
    ): Promise<HttpStatus> {
        return this.userRoomService.loginToTheRoomByPassword(+id, userId, password)
    }

    @Get('user/room/:id/exit')
    @UseGuards(JwtAuthGuard)
    getOutOfTheRoom(@Param('id') id: string, @GetCurrentUser() { userId }: JwtPayload): Promise<HttpStatus> {
        return this.userRoomService.getOutOfTheRoom(+id, userId)
    }
}
