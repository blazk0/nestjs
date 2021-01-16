import { ApiHideProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';
import { genderSelect, roles } from 'src/constants/enums';

export class SignUpDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsIn([genderSelect.FEMALE, genderSelect.MALE])
  gender: genderSelect;

  @IsOptional()
  @ApiHideProperty()
  @IsIn([roles.admin, roles.user])
  role: roles;
}
