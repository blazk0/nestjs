import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;
  }

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
