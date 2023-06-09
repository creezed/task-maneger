import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Exclude } from 'class-transformer'
import { UserModel } from '@practica/common'
import { Room } from '../../room/entities/room.entity'

@Entity()
export class User implements UserModel {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    username: string

    @Column({ unique: true })
    email: string

    @Column()
    @Exclude()
    password: string

    @OneToMany(() => Room, (room) => room.host)
    rooms: Room[]

    @BeforeInsert()
    @BeforeUpdate()
    emailAndUsernameToLowerCase(): void {
        this.email = this.email.toLowerCase()
        this.username = this.username.toLowerCase()
    }
}
