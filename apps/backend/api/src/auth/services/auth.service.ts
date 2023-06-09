import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { LoginUserDto } from '../dto/login-user.dto'
import { User } from '../../user/entities/user.entity'
import { UserService } from '../../user/services/user.service'
import { RegistrationUserDto } from '../dto/registration-user.dto'
import { TokenService } from '../../token/services/token.service'
import { AuthResponse } from '@practica/common'
import { compareHashAsync, hashPasswordAsync } from '@practica/api/shared'

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly tokenService: TokenService) {}

    async login(dto: LoginUserDto): Promise<AuthResponse> {
        const user = await this.validateUser(dto)
        const token = await this.tokenService.generateToken(user)

        return { user, token }
    }

    async registration(dto: RegistrationUserDto): Promise<AuthResponse> {
        const userWithEmail = await this.userService.findOneByEmail(dto.email)

        if (userWithEmail) {
            throw new BadRequestException('Пользователь с этим адресом уже существует')
        }

        const userWithUserName = await this.userService.findOneByUserName(dto.username)

        if (userWithUserName) {
            throw new BadRequestException('Пользователь с этим именем уже существует')
        }

        const user = await this.userService.create({
            ...dto,
            password: await hashPasswordAsync(dto.password),
        })

        const token = await this.tokenService.generateToken(user)

        return {
            user: { id: user.id, email: user.email, username: user.username },
            token,
        }
    }

    async validateUser({ email, password }: LoginUserDto): Promise<User> {
        const user = await this.userService.findOneByEmail(email)

        if (!user) {
            throw new UnauthorizedException('Пользователь не найден')
        }

        const isValidPassword = await compareHashAsync(password, user.password)

        if (!isValidPassword) {
            throw new UnauthorizedException('Неверный пароль')
        }

        return user
    }
}
