import { forwardRef, Module } from '@nestjs/common'
import { RoomService } from './services/room.service'
import { RoomController } from './controllers/room.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Room } from './entities/room.entity'
import { UserModule } from '../user/user.module'

@Module({
    imports: [TypeOrmModule.forFeature([Room]), forwardRef(() => UserModule)],
    controllers: [RoomController],
    providers: [RoomService],
    exports: [RoomService],
})
export class RoomModule {}
