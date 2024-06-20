import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import * as argon2 from "argon2";
import { UserCreateDto, UserDocument } from '../schema/user';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async create(userCreateDto: UserCreateDto) {
    const user = await this.userModel.create({
      username: userCreateDto.username,
      email: userCreateDto.email,
      password: await this.hashPassword(userCreateDto.password),
      roles: userCreateDto.roles,
      activated: userCreateDto.activated,
    });
    return user;
  }

  async activate(id: string) {
    const user = await this.userModel
      .updateOne(
        { _id: id },
        {
          $set: {
            activated: true,
          },
        }
      )
      .exec();
    return user;
  }

  async deactivate(id: string) {
    const user = await this.userModel
      .updateOne(
        { _id: id },
        {
          $set: {
            activated: false,
          },
        }
      )
      .exec();
    return user;
  }

  async updateUsername(id: string, username: string) {
    const user = await this.userModel
      .updateOne(
        { _id: id },
        {
          $set: {
            username: username,
          },
        }
      )
      .exec();
    return user;
  }

  async updateEmail(id: string, email: string) {
    const user = await this.userModel
      .updateOne(
        { _id: id },
        {
          $set: {
            email: email,
          },
        }
      )
      .exec();
    return user;
  }

  async updatePassword(id: ObjectId, password: string) {
    const user = await this.userModel
      .updateOne(
        { _id: id },
        {
          $set: {
            password: await this.hashPassword(password),
          },
        }
      )
      .exec();
    return user;
  }

  async updateRenewToken(id: string, renewToken?: string) {
    const user = await this.userModel
      .updateOne(
        { _id: id },
        {
          $set: {
            renewToken: renewToken ? await this.hashRenewToken(renewToken) : undefined,
          },
        }
      )
      .exec();
    return user;
  }

  async hashPassword(password: string) {
    const hash = await argon2.hash(password);
    return hash;
  }

  async hashRenewToken(renewToken: string) {
    const hash = await argon2.hash(renewToken);
    return hash;
  }

  async comparePasswords(passwordLogin, passwordUser) {
    const match = await argon2.verify(passwordUser, passwordLogin);
    return match;
  }

  async count() {
    const count = await this.userModel.countDocuments().exec();
    return count;
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findById(id: string) {
    return this.userModel.findOne({ _id: id }).exec();
  }

  async findByUsername(username: string) {
    const user = await this.userModel.findOne({ username: username }).exec();
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email }).exec();
    return user;
  }
}
