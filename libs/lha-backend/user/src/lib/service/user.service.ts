import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserCreateDto, UserDocument } from '../schema/user';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(@InjectModel('user') private userModel: Model<UserDocument>) {}

  async create(userCreateDto: UserCreateDto) {
    const user = new this.userModel({
      username: userCreateDto.username,
      email: userCreateDto.email,
      password: await this.hashPassword(userCreateDto.password),
      roles: userCreateDto.roles,
      activated: userCreateDto.activated,
    });
    return user.save();
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

  async updatePassword(id: string, password: string) {
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

  async updateRenewToken(id: string, renewToken: string) {
    const user = await this.userModel
      .updateOne(
        { _id: id },
        {
          $set: {
            renewToken: await this.hashRenewToken(renewToken),
          },
        }
      )
      .exec();
    return user;
  }

  async hashPassword(password: string) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  async hashRenewToken(renewToken: string) {
    const hash = await bcrypt.hash(renewToken, 10);
    return hash;
  }

  async comparePasswords(passwordLogin, passwordUser) {
    const match = await bcrypt.compare(passwordLogin, passwordUser);
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
