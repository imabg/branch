import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const PASSWORD_SALT_ROUND = 8;
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

  @ApiProperty({ description: 'user password ' })
  @Prop({ type: String, required: true })
  password: string;

  @ApiProperty({ description: 'company id to which user belongs to' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Company' })
  company: string;

  @ApiProperty({ description: 'user status ' })
  @Prop({ type: Boolean, default: true })
  isActive: true;
}

export const UserSchema = SchemaFactory.createForClass(UserEntity);

UserSchema.pre('save', async function (next) {
  if (this.password) {
    this.password = await bcrypt.hash(this.password, PASSWORD_SALT_ROUND);
  }
  next();
});
