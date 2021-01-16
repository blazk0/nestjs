import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { gender, roles } from '../../constants/enums';
import { Exclude } from 'class-transformer';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  constructor(
    name: string,
    age: number,
    email: string,
    password: string,
    gender: gender,
    role: roles,
    salt: string,
  ) {
    super();

    this.name = name;
    this.age = age;
    this.email = email;
    this.password = password;
    this.gender = gender;
    this.role = role;
    this.salt = salt;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  @ApiHideProperty()
  password: string;

  @Column()
  gender: gender;

  @Column()
  @Exclude()
  @ApiHideProperty()
  salt: string;

  @Column({ default: roles.user })
  @Exclude()
  @ApiHideProperty()
  role: roles;

  token: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
