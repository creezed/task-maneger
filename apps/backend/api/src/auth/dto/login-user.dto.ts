import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'
import { LoginParams } from '@practica/common'

export class LoginUserDto implements LoginParams {
    @IsNotEmpty({ message: 'Почта не может быть пустой' })
    @IsString()
    @IsEmail()
    email: string

    @IsNotEmpty({ message: 'Пароль не может быть пустой' })
    @IsString()
    @MinLength(5, { message: 'Пароль должен содержать минимум 5 символа' })
    @MaxLength(12, { message: 'Пароль должен содержать максимум 12 символа' })
    password: string
}
