// import { Test } from '@nestjs/testing';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { UsersController } from '../users.controller';
// import { UsersService } from '../users.service';
// import { User } from '../user.entity';
// import { CoreModule } from '../../core/core.module'
// import {BadRequestException} from '@nestjs/common';
//
// import { UsersRepository } from '../users.repository';
//
// describe('UsersController', () => {
//   let usersController, usersService;
//
//   beforeEach(async () => {
//     const module = await Test.createTestingModule({
//       imports: [CoreModule],
//       controllers: [UsersController],
//       providers: [UsersService, { provide: getRepositoryToken(User), useClass: UsersRepository }],
//     }).compile();
//
//     usersController = module.get<UsersController>(UsersController);
//     usersService = module.get<UsersService>(UsersService);
//   });
//
//   describe('findMany', () => {
//     it('should return array of users', async () => {
//       const result = ['users'];
//
//       jest.spyOn(usersService, 'findMany').mockImplementation(() => result);
//
//       expect(await usersController.findMany({})).toBe(result);
//     });
//
//     it('should return paginated response if query object has been provided', async () => {
//       const query: PaginationDto = {
//         page: 1,
//         limit: 5,
//       };
//
//       const result: PaginatedResult<string> = {
//         data: ['test'],
//         totalCount: 1,
//         itemsPerPage: 10,
//         page: 1,
//       };
//
//       jest.spyOn(usersService, 'findManyWithPagination').mockImplementation(() => result);
//
//       expect(await usersController.findMany(query)).toBe(result);
//     });
//   });
//
//   describe('findOne', () => {
//     it('should return one user', async () => {
//       const result = 'user';
//
//       jest.spyOn(usersService, 'findOne').mockImplementation(() => result);
//
//       expect(await usersController.findOne({})).toBe(result);
//     });
//   });
//
//   describe('createOne', () => {
//     const body: CreateUserDto = {
//       firstName: 'Alan',
//       lastName: 'Morgan',
//       email: 'test@gmail.com',
//       password: '123456',
//     };
//
//     const user = {
//       ...new User(),
//       ...body,
//       id: 1,
//     };
//
//     it('should return created user', async () => {
//
//       jest.spyOn(usersService, 'createOne').mockImplementation(() => user);
//       jest.spyOn(usersService, 'findOneByEmail').mockImplementation(() => undefined);
//
//       expect(await usersController.createOne(body)).toBe(user);
//     });
//
//     it('should throw an error if user with email exists', async () => {
//
//       jest.spyOn(usersService, 'createOne').mockImplementation(() => user);
//       jest.spyOn(usersService, 'findOneByEmail').mockImplementation(() => user);
//       try {
//         await usersController.createOne(body);
//         expect(false);
//       } catch (e) {
//         expect(JSON.stringify(e)).toEqual(JSON.stringify(new BadRequestException(Messages.USER_ALREADY_EXISTS)));
//       }
//     });
//   });
//
// });