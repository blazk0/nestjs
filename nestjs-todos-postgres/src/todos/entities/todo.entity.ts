import { Exclude } from 'class-transformer';
import { User } from 'src/auth/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class Todo extends BaseEntity {
  constructor(title: string, description: string, completed: boolean) {
    super();

    this.title = title;
    this.description = description;
    this.completed = completed;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  completed: boolean;

  @ManyToOne((type) => User, (user) => user.todos, { eager: false })
  @ApiHideProperty()
  @Exclude()
  user?: User;

  @Column()
  @Exclude()
  @ApiHideProperty()
  userId?: number;
}
