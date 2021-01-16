import { IsEmail, IsIn, IsNotEmpty, MinLength } from 'class-validator';
import { ApiHideProperty } from '@nestjs/swagger';
import { gender, roles } from '../../constants/enums';

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
  @IsIn([gender.FEMALE, gender.MALE])
  gender: gender;

  @IsIn([roles.admin, roles.user])
  @ApiHideProperty()
  role: roles;
}
