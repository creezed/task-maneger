import { forwardRef, Module } from '@nestjs/common'
import { UserService } from './services/user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { RoomModule } from '../room/room.module'
import { UserController } from './controllers/user.controller'
import { UserHostRoomController } from './controllers/user-host-room.controller'
import { UserRoomService } from './services/user-room.service'
import { UserHostRoomService } from './services/user-host-room.service'
import { UserRoomController } from './controllers/user-room.controller'

@Module({
    imports: [TypeOrmModule.forFeature([User]), forwardRef(() => RoomModule)],
    controllers: [UserController, UserHostRoomController, UserRoomController],
    providers: [UserService, UserRoomService, UserHostRoomService],
    exports: [UserService],
})
export class UserModule {}
