import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CompanyEntity } from './entities/company.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel('Companies')
    private readonly companyModel: Model<CompanyEntity>,
    private readonly userService: UsersService,
  ) {}
  async create(createCompanyDto: CreateCompanyDto) {
    try {
      const { headCount, profile, user } = createCompanyDto;
      const company = new this.companyModel({ headCount, profile });
      const companyEntity = await company.save();
      user.company = companyEntity.id;
      await this.userService.userOnboarding(user);
      return company;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return `This action returns all company`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
