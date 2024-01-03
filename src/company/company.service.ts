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
      const { name, website, countryCode, phone } = createCompanyDto;
      const company = new this.companyModel({
        name,
        website,
        countryCode,
        phone,
      });
      return await company.save();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async careerPageDetails(companyId: string) {
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
          $unwind: {
            path: '$jobData',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: '$_id',
            name: { $first: '$name' },
            website: { $first: '$website' },
            headCount: { $first: '$headCount' },
            identity: { $first: '$identity' },
            jobs: {
              $push: {
                $cond: {
                  if: { $ifNull: ['$jobData', null] },
                  then: {
                    id: { $ifNull: ['$jobData._id', null] },
                    title: { $ifNull: ['$jobData.title', null] },
                    experience: { $ifNull: ['$jobData.experience', null] },
                    locationType: { $ifNull: ['$jobData.locationType', null] },
                    location: { $ifNull: ['$jobData.location', null] },
                    employmentType: {
                      $ifNull: ['$jobData.employmentType', null],
                    },
                    config: { $ifNull: ['$jobData.config', null] },
                  },
                  else: '$$REMOVE',
                },
              },
            },
          },
        },
        {
          $project: {
            jobs: 1,
            website: 1,
            headCount: true,
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
