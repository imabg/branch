import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: {
    transform(doc, field) {
      field.id = field._id;
      delete field._id;
      delete field.__v;
    },
  },
})
export class UserEntity {
  @ApiProperty({ description: 'user email id' })
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @ApiProperty({ description: 'user name ' })
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty({ description: 'tell whether password set by user or not' })
  @Prop({ type: Boolean, default: false })
  isPasswordSet: boolean;

  @ApiProperty({ description: 'user password ' })
  @Prop({ type: String })
  password: string;

  @ApiProperty({ description: 'company id to which user belongs to' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Company' })
  company: string;

  @ApiProperty({ description: 'user status ' })
  @Prop({ type: Boolean, default: true })
  isActive: true;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);
