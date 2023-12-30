import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entities/user.entity';
import { UpdateUserPasswordDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users')
    private readonly userModel: Model<UserEntity>,
    private readonly configService: ConfigService,
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

  async findById(id: string): Promise<UserEntity> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return user;
  }

  async updatePwd(data: UpdateUserPasswordDto) {
    try {
      await this.findById(data.userId);
      const hashedPwd = await this._encryptPwd(data.password);
      await this.userModel.updateOne(
        { _id: data.userId },
        { $set: { password: hashedPwd, isPasswordSet: true } },
      );
      return {
        message: 'password updated successfully',
      };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async _encryptPwd(password: string): Promise<string> {
    return await bcrypt.hash(
      password,
      this.configService.get('util.saltRound'),
    );
  }
}
