import { Controller, Get, Param } from '@nestjs/common'
import { UserService } from '../services/user.service'
import { instanceToPlain } from 'class-transformer'

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('users')
    getAll(): Record<string, any> {
        return instanceToPlain(this.userService.findAll())
    }

    @Get('user/:id')
    getOne(@Param('id') id: string): Record<string, any> {
        return instanceToPlain(this.userService.findOneById(+id))
    }
}
