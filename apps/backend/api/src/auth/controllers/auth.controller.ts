import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from '../services/auth.service'
import { RegistrationUserDto } from '../dto/registration-user.dto'
import { LoginUserDto } from '../dto/login-user.dto'
import { instanceToPlain } from 'class-transformer'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post('local/registration')
    async registration(@Body() dto: RegistrationUserDto): Promise<Record<string, any>> {
        return instanceToPlain(this.authService.registration(dto))
    }

    @HttpCode(HttpStatus.OK)
    @Post('local/login')
    async login(@Body() dto: LoginUserDto): Promise<Record<string, any>> {
        return instanceToPlain(this.authService.login(dto))
    }
}
