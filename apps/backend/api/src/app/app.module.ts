import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { getTypeOrmConfig } from './config/typeorm/getTypeOrmConfig'
import { UserModule } from '../user/user.module'
import { AuthModule } from '../auth/auth.module'
import { TokenModule } from '../token/token.module'
import { RoomModule } from '../room/room.module'

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: getTypeOrmConfig,
        }),
        ConfigModule.forRoot({ envFilePath: '.env' }),
        UserModule,
        AuthModule,
        TokenModule,
        RoomModule,
    ],
    providers: [],
})
export class AppModule {}
