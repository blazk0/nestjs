import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { SignInDto } from './dto/signin.dto';

import { SignUpDto } from './dto/signup.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository) private authRepository: AuthRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const user = await this.authRepository.signUp(signUpDto);

    return this.generateToken(user);
  }

  async signIn(signInDto: SignInDto): Promise<User> {
    const user = await this.authRepository.signIn(signInDto);

    return this.generateToken(user);
  }

  async generateToken(user: User): Promise<User> {
    const payload = { email: user.email };
    const token = await this.jwtService.sign(payload);
    user.token = token;

    return user;
  }
}
