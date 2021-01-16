import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { User } from 'src/auth/entities/user.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { TodoRepository } from './todos.repository';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoRepository) private todoRepository: TodoRepository,
  ) {}

  async getTodos(
    options: IPaginationOptions,
    user: User,
  ): Promise<Pagination<Todo>> {
    return await this.todoRepository.getTodos(options, user);
  }

  async getTodo(id: number, user: User): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!todo) {
      throw new NotFoundException(`Todo of id ${id} not found`);
    }

    return todo;
  }

  async createTodo(todoDto: CreateTodoDto, user: User): Promise<Todo> {
    return this.todoRepository.createTodo(todoDto, user);
  }

  async updateTodo(
    id: number,
    todoDto: UpdateTodoDto,
    user: User,
  ): Promise<Todo> {
    await this.getTodo(id, user);

    const todo = this.todoRepository.save(todoDto);

    return todo;
  }

  async updateTodoStatus(
    id: number,
    completed: boolean,
    user: User,
  ): Promise<Todo> {
    const todo = await this.getTodo(id, user);
    todo.completed = completed;
    await todo.save();

    return todo;
  }

  async deleteTodo(id: number, user: User): Promise<void> {
    const res = await this.todoRepository.delete({ id, userId: user.id });

    if (res.affected === 0) {
      throw new NotFoundException(`Todo of id ${id} not found`);
    }
  }
}
