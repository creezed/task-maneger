import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class CreateRoomDto {
    @IsNotEmpty({ message: 'Название комнаты не может быть пустым' })
    @MinLength(4, { message: 'Название должно содержать минимум 4 символа' })
    @MaxLength(30, { message: 'Название должно содержать максимум 30 символов' })
    name: string

    @IsNotEmpty({ message: 'Пароль не может быть пустым' })
    @MinLength(5, { message: 'Пароль должен содержать минимум 5 символа' })
    @MaxLength(12, { message: 'Пароль должен содержать максимум 12 символа' })
    password: string
}
