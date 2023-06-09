import { RoomModel } from '@practica/common'
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '../../user/entities/user.entity'
import { Exclude } from 'class-transformer'

@Entity('room')
export class Room implements RoomModel {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    @Exclude()
    password: string

    @ManyToOne(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    host: User

    @ManyToMany(() => User)
    @JoinTable({ name: 'users_rooms' })
    users: User[]
}
