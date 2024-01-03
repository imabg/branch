import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { JobConfigOptions } from '../jobConfig.constant';
import mongoose from 'mongoose';

export class PersonalInformation {
  @ApiProperty({ description: 'name field' })
  @Prop({ type: String, default: JobConfigOptions.required })
  name: string;

  @ApiProperty({ description: 'email field' })
  @Prop({ type: String, default: JobConfigOptions.required })
  email: string;

  @ApiProperty({ description: 'headline field' })
  @Prop({
    type: String,
    enum: Object.keys(JobConfigOptions),
    default: JobConfigOptions.enabled,
  })
  headline: string;

  @ApiProperty({ description: 'phone field' })
  @Prop({
    type: String,
    enum: Object.keys(JobConfigOptions),
    default: JobConfigOptions.disabled,
  })
  phone: string;

  @ApiProperty({ description: 'address field' })
  @Prop({
    type: String,
    enum: Object.keys(JobConfigOptions),
    default: JobConfigOptions.enabled,
  })
  address: string;

  @ApiProperty({ description: 'photo field' })
  @Prop({
    type: String,
    enum: Object.keys(JobConfigOptions),
    default: JobConfigOptions.disabled,
  })
  photo: string;
}

export class ProfileInformation {
  @ApiProperty({ description: 'summary field' })
  @Prop({
    type: String,
    enum: Object.keys(JobConfigOptions),
    default: JobConfigOptions.disabled,
  })
  summary: string;

  @ApiProperty({ description: 'resume field' })
  @Prop({
    type: String,
    enum: Object.keys(JobConfigOptions),
    default: JobConfigOptions.required,
  })
  resume: string;

  @ApiProperty({ description: 'cover letter field' })
  @Prop({
    type: String,
    enum: Object.keys(JobConfigOptions),
    default: JobConfigOptions.enabled,
  })
  coverLetter: string;
}
@Schema({ timestamps: true })
export class JobConfigEntity {
  @Prop({ type: PersonalInformation })
  personalInformation: PersonalInformation;

  @Prop({ type: ProfileInformation })
  profileInformation: ProfileInformation;

  @ApiProperty({ description: 'Job id' })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Jobs',
    required: true,
    index: true,
  })
  job: string;
}

export const JobConfigSchema = SchemaFactory.createForClass(JobConfigEntity);
