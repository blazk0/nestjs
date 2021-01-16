import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { User } from 'src/auth/entities/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './entities/todo.entity';

@EntityRepository(Todo)
export class TodoRepository extends Repository<Todo> {
  async getTodos(
    options: IPaginationOptions,
    user: User,
  ): Promise<Pagination<Todo>> {
    const query = this.createQueryBuilder('todo');

    query.where('todo.userId = :userId', { userId: user.id });

    return await paginate<Todo>(query, options);
  }

  async createTodo(todoDto: CreateTodoDto, user: User): Promise<Todo> {
    const { title, description, completed } = todoDto;
    const todo = new Todo(title, description, completed);
    todo.user = user;
    await todo.save();

    return todo;
  }
}
