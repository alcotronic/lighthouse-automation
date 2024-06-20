import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { User, UserDocument } from '../schema/user';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('UserService', () => {
  let service: UserService;
  let model: Model<UserDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: {
            create: jest.fn((data: unknown) => data),
            updateOne: jest.fn((id: string) => { return { exec: jest.fn().mockReturnValueOnce({ acknowledged: true, upsertedId: id})}})
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    model = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('user should be created', async () => {
    const spyCreate = jest.spyOn(model, 'create');
    const result = await service.create({username: 'test', email: 'test@test', password: 'testpw'});
    expect(spyCreate).toHaveBeenCalled();
    expect(result.username).toEqual('test');
  });

  it('user should be activated', async () => {
    const spyCreate = jest.spyOn(model, 'updateOne');
    const result = await service.activate('1');
    expect(spyCreate).toHaveBeenCalled();
    expect(result.acknowledged).toEqual(true);
    expect(result.upsertedId).toEqual({_id: '1'});
  });

  it('user should be deactivated', async () => {
    const spyCreate = jest.spyOn(model, 'updateOne');
    const result = await service.deactivate('1');
    expect(spyCreate).toHaveBeenCalled();
    expect(result.acknowledged).toEqual(true);
    expect(result.upsertedId).toEqual({_id: '1'});
  });

  it('username should be updated', async () => {
    const spyCreate = jest.spyOn(model, 'updateOne');
    const result = await service.updateUsername('1', 'test');
    expect(spyCreate).toHaveBeenCalled();
    expect(result.acknowledged).toEqual(true);
    expect(result.upsertedId).toEqual({_id: '1'});
  });

  // it('password should be updated', () => {
  //   expect(service).toBeDefined();
  // });

  // it('renewToken should be updated', () => {
  //   expect(service).toBeDefined();
  // });

  // it('hash should be returned', () => {
  //   expect(service).toBeDefined();
  // });

  // it('renewToken hash should be returned', () => {
  //   expect(service).toBeDefined();
  // });

  // it('password comparison result should be returned', () => {
  //   expect(service).toBeDefined();
  // });

  // it('user count should be returned', () => {
  //   expect(service).toBeDefined();
  // });

  // it('all users should be returned', () => {
  //   expect(service).toBeDefined();
  // });

  // it('user should be returned by id if user with given id exists', () => {
  //   expect(service).toBeDefined();
  // });

  // it('user should be returned by username if user with given username exists', () => {
  //   expect(service).toBeDefined();
  // });

  // it('user should be returned by email if user with given email exists', () => {
  //   expect(service).toBeDefined();
  // });
});
