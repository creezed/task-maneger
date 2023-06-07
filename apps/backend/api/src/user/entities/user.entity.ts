import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserModel } from '@practica/common';

@Entity()
export class User implements UserModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  emailAndUsernameToLowerCase(): void {
    this.email = this.email.toLowerCase();
    this.username = this.username.toLowerCase();
  }
}
