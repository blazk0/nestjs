import { IsNotEmpty, IsOptional } from 'class-validator';

export class AboutDto {
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  experience: string;

  @IsNotEmpty()
  specialty: string;

  @IsNotEmpty()
  bio: string[];

  @IsOptional()
  image: string;
}
