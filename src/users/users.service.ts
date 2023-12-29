import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users')
    private readonly userModel: Model<UserEntity>,
  ) {}

  async userOnboarding(user: CreateUserDto): Promise<UserEntity> {
    try {
      const newUser = new this.userModel(user);
      return await newUser.save();
    } catch (e) {
      console.log(`error: [userOnboarding]: ${e}`);
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.userModel.findOne({ email, isActive: true }).exec();
  }
}
