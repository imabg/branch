import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation } from '@nestjs/swagger';
import { UpdateUserPasswordDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post('create')
  @ApiOperation({ summary: 'User creation' })
  async create(@Body() body: CreateUserDto) {
    return this.userService.userOnboarding(body);
  }

  @Post('update/password')
  @ApiOperation({ summary: 'Update user password' })
  async updatePwd(@Body() body: UpdateUserPasswordDto) {
    return this.userService.updatePwd(body);
  }
}
