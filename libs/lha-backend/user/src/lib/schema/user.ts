import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Role } from '@lighthouse-automation/lha-common';

export type UserDocument = User & Document;

export interface UserCreateDto {
  username: string;
  email: string;
  password: string;
  roles?: Role[];
  activated?: boolean;
}

@Schema()
export class User {
  _id?: ObjectId;
  @Prop() username: string;
  @Prop() email: string;
  @Prop() password: string;
  @Prop() roles: Role[];
  @Prop() activated: boolean;
  @Prop() renewToken: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
