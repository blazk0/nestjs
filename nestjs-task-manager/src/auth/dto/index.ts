import { IsString, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
