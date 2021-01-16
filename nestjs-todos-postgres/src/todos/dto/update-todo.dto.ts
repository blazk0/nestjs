import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateTodoDto {
  @IsOptional()
  id: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  completed: boolean;
}
