import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
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

  async activeJobs(companyId: string) {
    try {
      const result = await this.companyModel.aggregate([
        {
          $lookup: {
            from: 'jobs',
            localField: '_id',
            foreignField: 'company',
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      {
                        $eq: [
                          '$company',
                          new mongoose.Types.ObjectId(companyId),
                        ],
                      },
                      { $eq: ['$isArchive', false] },
                    ],
                  },
                },
              },
            ],
            as: 'jobData',
          },
        },
        {
          $unwind: '$jobData',
        },
        {
          $group: {
            _id: '$_id',
            profile: { $first: '$profile' },
            identity: { $first: '$identity' },
            jobs: {
              $push: {
                id: '$jobData._id',
                title: '$jobData.title',
                experience: '$jobData.experience',
                locationType: '$jobData.locationType',
                location: '$jobData.location',
                employmentType: '$jobData.employmentType',
              },
            },
          },
        },
        {
          $project: {
            jobs: 1,
            profile: 1,
            identity: 1,
          },
        },
      ]);
      return result[0];
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findOne(id: string): Promise<CompanyEntity> {
    try {
      const company = await this.companyModel.findById(id);
      if (!company) throw new NotFoundException('Company not found');
      return company;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
