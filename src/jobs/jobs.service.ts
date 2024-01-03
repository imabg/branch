import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { JobEntity } from './entities/job.entity';
import { JobConfigEntity } from './entities/jobConfig.entity';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel('Jobs') private readonly jobModel: Model<JobEntity>,
    @InjectModel('JobConfig')
    private readonly jobConfigModel: Model<JobConfigEntity>,
  ) {}
  async create(createJobDto: CreateJobDto): Promise<JobEntity> {
    try {
      const job = new this.jobModel(createJobDto);
      const jobEntity = await job.save();
      const config = new this.jobConfigModel({
        job: jobEntity.id,
        personalInformation: {},
        profileInformation: {},
      });
      const configEntity = await config.save();
      await this.jobModel.updateOne(
        { _id: jobEntity.id },
        { $set: { config: configEntity.id } },
      );
      return jobEntity;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findAll(companyId: string) {
    try {
      return await this.jobModel
        .find({
          company: new mongoose.Types.ObjectId(companyId),
        })
        .exec();
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  async findActiveJob(companyId: string) {
    try {
      return await this.jobModel
        .find({
          company: new mongoose.Types.ObjectId(companyId),
          isArchive: false,
        })
        .exec();
    } catch (e) {
      throw new NotFoundException(e.message);
    }
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
