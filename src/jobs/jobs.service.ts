import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JobEntity } from './entities/job.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel('Jobs') private readonly jobModel: Model<JobEntity>,
  ) {}
  async create(createJobDto: CreateJobDto): Promise<JobEntity> {
    try {
      const job = new this.jobModel(createJobDto);
      return await job.save();
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  findAll() {
    return `This action returns all jobs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} job`;
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
