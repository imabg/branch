import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    //   validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      throw new HttpException('Password not correct', HttpStatus.UNAUTHORIZED);
    return await this.login(user);
  }

  async login(user: UserEntity) {
    const payload = { email: user.email };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
