import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiOperation } from '@nestjs/swagger';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @ApiOperation({ summary: 'Create a active job' })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createJobDto: CreateJobDto) {
    return this.jobsService.create(createJobDto);
  }
  @ApiOperation({ summary: 'Get all jobs' })
  @UseGuards(JwtAuthGuard)
  @Get('/all')
  findAll(@Request() req: any) {
    return this.jobsService.findAll(req.user.company);
  }

  @ApiOperation({ summary: 'Get all active jobs' })
  @UseGuards(JwtAuthGuard)
  @Get()
  findActiveJobs(@Request() req: any) {
    return this.jobsService.findActiveJob(req.user.company);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(+id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(+id);
  }
}
