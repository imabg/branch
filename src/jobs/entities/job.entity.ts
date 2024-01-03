import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { JobLocationType } from '../job.constant';

class SalaryType {
  @ApiProperty({ description: 'Currency' })
  @Prop({ type: String })
  currency: string;

  @ApiProperty({ description: 'Min value' })
  @Prop({ type: Number })
  min: number;

  @ApiProperty({ description: 'Max value' })
  @Prop({ type: Number })
  max: number;
}

@Schema({ timestamps: true })
export class JobEntity {
  @ApiProperty({ description: 'Title' })
  @Prop({ type: String, required: true, maxlength: 80 })
  title: string;

  @ApiProperty({ description: 'Description about the job' })
  @Prop({ type: String, required: true })
  description: string;

  @ApiProperty({ description: 'Requirements about the job' })
  @Prop({ type: String })
  requirements: string;

  @ApiProperty({ description: 'Benefits about the job' })
  @Prop({ type: String })
  benefits: string;

  @ApiProperty({ description: 'Tell whether job is internal or not' })
  @Prop({ type: Boolean, default: false })
  isInternal: boolean;

  @ApiProperty({ description: 'User defined job code' })
  @Prop({ type: String, index: true })
  jobCode: string;

  @ApiProperty({ description: 'Job location type' })
  @Prop({ type: String, enum: Object.keys(JobLocationType), required: true })
  locationType: string;

  @ApiProperty({ description: 'Job location' })
  @Prop({ type: String, required: true })
  location: string;

  @ApiProperty({ description: 'Department' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Department' })
  department: Array<string>;

  @ApiProperty({ description: 'Company' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Company' })
  company: string;

  @ApiProperty({ description: 'Industry type' })
  @Prop({ type: String })
  industry: string;

  @ApiProperty({ description: 'Job function' })
  @Prop({ type: String })
  function: string;

  @ApiProperty({ description: 'Employment type' })
  @Prop({ type: String, required: true })
  employmentType: string;

  @ApiProperty({ description: 'Experience required for the job' })
  @Prop({ type: String, required: true })
  experience: string;

  @ApiProperty({ description: 'Salary description' })
  @Prop({ type: SalaryType })
  salary: SalaryType;

  @ApiProperty({ description: 'Is Job is active' })
  @Prop({ type: Boolean, default: false })
  isArchive: boolean;

  @ApiProperty({ description: 'Job config' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'JobConfig' })
  config: string;
}

export const JobSchema = SchemaFactory.createForClass(JobEntity);
