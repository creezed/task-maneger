import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { RegistrationParams } from '@practica/shared/types';

export class RegistrationUserDto implements RegistrationParams {
  @IsNotEmpty({ message: 'Почта не может быть пустой' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Логин не может быть пустым' })
  @MinLength(4, { message: 'Логин должен содержать минимум 4 символа' })
  @MaxLength(8, { message: 'Логин должен содержать максимум 8 символов' })
  username: string;

  @IsNotEmpty({ message: 'Пароль не может быть пустым' })
  @MinLength(5, { message: 'Пароль должен содержать минимум 5 символа' })
  @MaxLength(12, { message: 'Пароль должен содержать максимум 12 символа' })
  password: string;
}
