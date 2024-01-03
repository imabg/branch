import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HeadCount } from '../company.constant';
import mongoose from 'mongoose';

class Identity {
  @ApiProperty({ description: 'Logo URL' })
  @Prop({ type: String })
  image: string;

  @ApiProperty({ description: 'Description' })
  @Prop({ type: String })
  description: string;
}

@Schema({ timestamps: true })
export class CompanyEntity {
  @ApiProperty({ description: 'company name' })
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty({ description: 'Website' })
  @Prop({ type: String, required: true, unique: true })
  website: string;

  @ApiProperty({ description: 'Phone Number' })
  @Prop({ type: String, maxlength: 10, required: true })
  phone: string;

  @ApiProperty({ description: 'Country code' })
  @Prop({ type: String, required: true })
  countryCode: string;

  @ApiProperty({ description: 'head count' })
  @Prop({ enum: HeadCount, type: String })
  headCount: string;

  @ApiProperty({ description: 'identity' })
  @Prop({ type: Identity })
  identity: Identity;

  @ApiProperty({ description: 'career page toggle' })
  @Prop({ type: Boolean, default: false })
  isCareerPageActive: boolean;

  @ApiProperty({ description: 'departments' })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' }] })
  departments: mongoose.Schema.Types.ObjectId[];
}

export const CompanySchema = SchemaFactory.createForClass(CompanyEntity);
