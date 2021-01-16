import { EntityRepository, Repository } from 'typeorm';
import { SignUpDto } from './dto/signup.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async signUp(signUpDto: SignUpDto): Promise<User> {
    const { name, age, email, gender, password, role } = signUpDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User(name, age, gender, email, hashedPassword, salt, role);

    try {
      const newUser = await user.save();

      return newUser;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(signInDto: SignInDto): Promise<User> {
    const user = await this.findOne({ email: signInDto.email });

    if (user && (await user.validatePassword(signInDto.password))) {
      return user;
    } else {
      throw new UnauthorizedException('Invalid Credentials');
    }
  }
}
