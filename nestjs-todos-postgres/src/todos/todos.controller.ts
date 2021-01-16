import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
  ValidationPipe,
  UsePipes,
  Query,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Pagination } from 'nestjs-typeorm-paginate';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { TodosService } from './todos.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { UpdateTodoStatusDto } from './dto/update-status.dto';
import { GetUser, Roles, RolesGuard } from 'src/decorators/auth';
import { User } from 'src/auth/entities/user.entity';
import { roles } from 'src/constants/enums';

@Controller('todos')
@ApiTags('Todos')
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
@UseGuards(AuthGuard(), RolesGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  @Roles(roles.admin)
  @ApiOkResponse({ type: Todo })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Default: 1',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Default: 15',
  })
  getTodos(
    @Query('page') page = 1,
    @Query('limit') limit = 15,
    @GetUser() user: User,
  ): Promise<Pagination<Todo>> {
    limit = limit > 100 ? 100 : limit;
    return this.todosService.getTodos({ page, limit }, user);
  }

  @Get(':id')
  @ApiOkResponse({ type: Todo })
  @ApiNotFoundResponse({ description: 'Todo not found' })
  getTodo(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Todo> {
    return this.todosService.getTodo(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @ApiBadRequestResponse({ description: 'Bad Request' })
  createTodo(
    @Body() todoDto: CreateTodoDto,
    @GetUser() user: User,
  ): Promise<Todo> {
    return this.todosService.createTodo(todoDto, user);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @ApiOkResponse({ type: Todo })
  @ApiNotFoundResponse({ description: 'Todo not found' })
  updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() todoDto: UpdateTodoDto,
    @GetUser() user: User,
  ): Promise<Todo> {
    return this.todosService.updateTodo(id, todoDto, user);
  }

  @Patch(':id/status')
  @UsePipes(ValidationPipe)
  @ApiOkResponse({ type: Todo })
  @ApiNotFoundResponse({ description: 'Todo not found' })
  updateTodoStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdateTodoStatus: UpdateTodoStatusDto,
    @GetUser() user: User,
  ): Promise<Todo> {
    return this.todosService.updateTodoStatus(
      id,
      UpdateTodoStatus.completed,
      user,
    );
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Todo deleted' })
  @ApiNotFoundResponse({ description: 'Todo not found' })
  deleteTodo(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.todosService.deleteTodo(id, user);
  }
}
