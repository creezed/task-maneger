import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '@practica/api/types';
import { UserModel } from '@practica/shared/models';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}
  async generateToken(user: UserModel): Promise<string> {
    const jwtPayload: JwtPayload = {
      userId: user.id,
      email: user.email,
    };

    return this.jwtService.signAsync(jwtPayload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: '30d',
    });
  }

  async getPayload<T extends object>(token: string): Promise<T> {
    return await this.jwtService.verifyAsync<T>(token, {
      secret: this.configService.get('JWT_SECRET'),
    });
  }
}
