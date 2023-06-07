import { Injectable } from '@nestjs/common'
import { CreateUserDto } from '../dto/create-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../entities/user.entity'
import { DeleteResult, FindOptionsRelations, Repository } from 'typeorm'

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}
    create(createUserDto: CreateUserDto): Promise<User> {
        return this.userRepository.save(createUserDto)
    }

    findAll(): Promise<User[]> {
        return this.userRepository.find()
    }

    findOneById(id: number, relations: FindOptionsRelations<User> | undefined = undefined): Promise<User | null> {
        return this.userRepository.findOne({ where: { id }, relations })
    }

    findOneByEmail(email: string, relations: FindOptionsRelations<User> | undefined = undefined): Promise<User | null> {
        return this.userRepository.findOne({ where: { email }, relations })
    }

    findOneByUserName(
        username: string,
        relations: FindOptionsRelations<User> | undefined = undefined
    ): Promise<User | null> {
        return this.userRepository.findOne({ where: { username }, relations })
    }

    remove(id: number): Promise<DeleteResult> {
        return this.userRepository.delete({ id })
    }
}
