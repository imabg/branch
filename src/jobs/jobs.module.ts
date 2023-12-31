import { Module } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JobSchema } from './entities/job.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Jobs', schema: JobSchema }])],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
