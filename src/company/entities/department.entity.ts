import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true })
export class DepartmentEntity {
  @ApiProperty({ description: 'department name' })
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty({ description: 'is department active' })
  @Prop({ type: Boolean, default: true })
  isActive: boolean;
}

export const DepartmentSchema = SchemaFactory.createForClass(DepartmentEntity);
