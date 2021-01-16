import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { genderSelect, roles } from '../../constants/enums';
import { Todo } from 'src/todos/entities/todo.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  constructor(
    name: string,
    age: number,
    gender: genderSelect,
    email: string,
    password: string,
    salt: string,
    role: roles,
  ) {
    super();

    this.name = name;
    this.age = age;
    this.gender = gender;
    this.email = email;
    this.password = password;
    this.salt = salt;
    this.role = role;
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
  password?: string;

  @Column()
  gender: genderSelect;

  @Column()
  @Exclude()
  @ApiHideProperty()
  salt?: string;

  @Column({ default: roles.user })
  @Exclude()
  @ApiHideProperty()
  role: roles;

  @Exclude()
  @OneToMany((type) => Todo, (todo) => todo.user, { eager: true })
  @ApiHideProperty()
  todos?: Todo[];

  token: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, String(this.salt));
    return hash === this.password;
  }
}
