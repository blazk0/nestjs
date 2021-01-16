import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateTodoStatusDto {
  @IsNotEmpty()
  @IsBoolean()
  completed: boolean;
}
