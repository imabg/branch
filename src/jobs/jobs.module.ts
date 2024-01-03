import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JobSchema } from './entities/job.entity';
import { JobConfigSchema } from './entities/jobConfig.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Jobs', schema: JobSchema },
      { name: 'JobConfig', schema: JobConfigSchema },
    ]),
  ],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
