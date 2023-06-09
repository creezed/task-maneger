import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class LoginToTheRoomDto {
    @IsNotEmpty({ message: 'Пароль не может быть пустым' })
    @MinLength(5, { message: 'Пароль должен содержать минимум 5 символа' })
    @MaxLength(12, { message: 'Пароль должен содержать максимум 12 символа' })
    password: string
}
