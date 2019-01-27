import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from '../users.service';
import { User } from '../user.entity';
import { CreateUserDto, SetNewPasswordDto, ChangePasswordDto} from '@astra/common/dto';
import {RpcException} from '@nestjs/microservices';
import {Messages, CommunicationCodes, HashTypes} from '@astra/common/enums';
import {UserHashesService} from '../../user-hashes/user-hashes.service';
import {UsersRepository} from '../users.repository';
import {
    mockEmailsClient,
    mockHashService,
    mockUser,
    mockUserHash,
    mockUserHashesService,
    mockUsersRepository, mockUserWithoutPassword
} from './mocks';
import {HashService} from '@astra/common/services';
import {UserHash} from '../../user-hashes/user-hash.entity';

describe('UsersService', () => {
  let usersService;
  const mockUsers = [new User({}), new User({})];

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
          UsersService,
          { provide: getRepositoryToken(UsersRepository), useValue: mockUsersRepository },
          { provide: UserHashesService, useValue: mockUserHashesService },
          { provide: HashService, useValue: mockHashService },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersService.emailsClient = mockEmailsClient;
  });

  describe('findMany', () => {
    it('should call usersRepository.find', async () => {
       const spy = jest.spyOn(mockUsersRepository, 'find').mockImplementation(async () => mockUsers);
       await usersService.findMany();
       expect(spy).toBeCalledWith({});
    });

      it('should return array of users', async () => {
        jest.spyOn(mockUsersRepository, 'find').mockImplementation(async () => mockUsers);
        expect(await usersService.findMany()).toEqual(mockUsers);
      });
  });

  describe('findById', () => {
    const id = 20;
    it('should call usersRepository.findById', async () => {
        const spy = jest.spyOn(mockUsersRepository, 'findById').mockImplementation(async () => mockUser);
        await usersService.findById(id);
        expect(spy).toBeCalledWith(id);
    });

    it('should return user', async () => {
        jest.spyOn(mockUsersRepository, 'findById').mockImplementation(async () => mockUser);
        expect(await usersService.findById(id)).toEqual(mockUser);
    });
  });

  describe('findOneByEmail', () => {
     const id = 20;
     it('should call usersRepository.findOneByEmail', async () => {
        const spy = jest.spyOn(mockUsersRepository, 'findOneByEmail').mockImplementation(async () => mockUser);
        await usersService.findOneByEmail(id);
        expect(spy).toBeCalledWith(id);
     });

     it('should return user', async () => {
        jest.spyOn(mockUsersRepository, 'findOneByEmail').mockImplementation(async () => mockUser);
        expect(await usersService.findOneByEmail(id)).toEqual(mockUser);
     });
  });

    describe('findOneByGoogleId', () => {
        const googleId = 'fdfdfdfdf';
        it('should call usersRepository.findOneByGoogleId', async () => {
            const spy = jest.spyOn(mockUsersRepository, 'findOneByGoogleId').mockImplementation(async () => mockUser);
            await usersService.findOneByGoogleId(googleId);
            expect(spy).toBeCalledWith(googleId);
        });

        it('should return user', async () => {
            jest.spyOn(mockUsersRepository, 'findOneByGoogleId').mockImplementation(async () => mockUser);
            expect(await usersService.findOneByGoogleId(googleId)).toEqual(mockUser);
        });
    });

    describe('updateOne', () => {
        it('should call usersRepository.updateOne', async () => {
            const spy = jest.spyOn(mockUsersRepository, 'updateOneAndFind').mockImplementation(async () => mockUser);
            await usersService.updateOne(mockUser.id, { name: 'Markus' });
            expect(spy).toBeCalledWith(mockUser.id, { name: 'Markus' });
        });

        it('should return user', async () => {
            jest.spyOn(mockUsersRepository, 'updateOneAndFind').mockImplementation(async () => mockUser);
            expect(await usersService.updateOne(mockUser.id, { name: 'Alan' })).toEqual(mockUser);
        });
    });

    describe('removeById', () => {
        const id = 20;
        it('should call usersRepository.removeById', async () => {
            const spy = jest.spyOn(mockUsersRepository, 'removeById').mockImplementation(async () => {});
            await usersService.removeById(id);
            expect(spy).toBeCalledWith(id);
        });
    });

  // describe('findManyWithPagination', () => {
  //   const query: Required<PaginationDto> = {
  //     page: 1,
  //     limit: 2,
  //   };
  //   const paginatedResult: PaginatedResponse<User> = {
  //     itemsPerPage: query.limit,
  //     totalCount: 5,
  //     page: query.page,
  //     data: mockUsers,
  //   };
  //   it('should return paginated result', async () => {
  //     jest.spyOn(usersService, 'prepareBuilder').mockImplementation(() =>  ({
  //       skip() {
  //         return this;
  //       },
  //       async getCount() {
  //         return 5;
  //       },
  //       take() {
  //         return this;
  //       },
  //       async getMany() {
  //         return mockUsers;
  //       }
  //     }));
  //
  //     const result = await usersService.findManyWithPagination(query);
  //
  //     expect(result).toEqual(paginatedResult);
  //   });
  //
  // });

  describe('createOne', () => {
      const payload: CreateUserDto = {
          firstName: 'Alan',
          lastName: 'Morgan',
          email: 'gogunov00@gmail.com',
          password: 'hello',
      };

    it('should create new user and return it', async () => {
       const result = {
         ...new User({}),
         ...payload,
         password: 'Some hash',
       };
       jest.spyOn(mockHashService, 'generateHash').mockImplementation(async () => result.password);
       jest.spyOn(mockUsersRepository, 'findOneByEmail').mockImplementation(async () => undefined);
       jest.spyOn(mockUsersRepository, 'save').mockImplementation(async () => result);

       expect(await usersService.createOne(payload)).toEqual(result);
    });

    it('should throw an exception if user with provided email already exists',  async () => {
      jest.spyOn(mockUsersRepository, 'findOneByEmail').mockImplementation(async () => {});
      try {
        await usersService.createOne(payload);
        expect(false);
      } catch (e) {
        expect(JSON.stringify(e)).toEqual(JSON.stringify(new RpcException(Messages.USER_ALREADY_EXISTS)));
      }
    });
  });

  describe('resetPassword', () => {
     const email = 'alan@gmail.com';
     beforeEach(() => {
         jest.spyOn(mockUserHashesService, 'createOne').mockImplementation(async () => mockUserHash);
         jest.spyOn(mockEmailsClient, 'send').mockImplementation(async () => ({
             toPromise() {},
         }));
     });

      it('should call usersRepository.findOneByEmail with email', async () => {
         const spy = jest.spyOn(mockUsersRepository, 'findOneByEmail').mockImplementation(async () => new User({}));
         await usersService.resetPassword(email);
         expect(spy).toBeCalledWith(email);
     });

     it('should throw an exception is user is not found by email', async () => {
       jest.spyOn(mockUsersRepository, 'findOneByEmail').mockImplementation(async () => undefined);
       try {
          await usersService.resetPassword(email);
          expect(false);
       } catch (e) {
          expect(JSON.stringify(e)).toEqual(JSON.stringify(new RpcException(Messages.USER_NOT_FOUND)));
       }
     });

     it('should call userHashesService.createOne with userId and HashType.RESET_PASSWORD', async () => {
         jest.spyOn(mockUsersRepository, 'findOneByEmail').mockImplementation(async () => mockUser);
         const spy = jest.spyOn(mockUserHashesService, 'createOne').mockImplementation(async () => mockUserHash);
         await usersService.resetPassword(email);
         expect(spy).toBeCalledWith(mockUser.id, HashTypes.RESET_PASSWORD);
     });

     it('should call emailsClient.send with valid command and payload', async () => {
         jest.spyOn(mockUsersRepository, 'findOneByEmail').mockImplementation(async () => mockUser);
         jest.spyOn(mockUserHashesService, 'createOne').mockImplementation(async () => mockUserHash);
         const spy = jest.spyOn(mockEmailsClient, 'send');
         await usersService.resetPassword(email);
         expect(spy).toBeCalledWith(
             { cmd: CommunicationCodes.SEND_RESET_PASSWORD_EMAIL },
             {
                 firstName: mockUser.firstName,
                 lastName: mockUser.lastName,
                 email: mockUser.email,
                 hash: mockUserHash.hash,
             }
         );
     });


  });

  describe('setNewPassword', () => {
    const payload: SetNewPasswordDto = {
        hash: mockUserHash.hash,
        password: '1234',
    };

    beforeEach(() => {
       jest.spyOn(mockUsersRepository, 'updateOneAndFind').mockImplementation(async () => undefined);
    });

    it('should call userHashesService.findOneByHash with provided hash', async () => {
        const spy = jest.spyOn(mockUserHashesService, 'findOneByHash').mockImplementation(async () => mockUserHash);
        await usersService.setNewPassword(payload);
        expect(spy).toBeCalledWith(payload.hash);
    });

      it('should throw an exception if hash is not found', async () => {
          jest.spyOn(mockUserHashesService, 'findOneByHash').mockImplementation(async () => undefined);
          try {
              await usersService.setNewPassword(payload);
              expect(false);
          } catch (e) {
              expect(JSON.stringify(e)).toEqual(JSON.stringify(new RpcException(Messages.INVALID_PASSWORD_HASH)));
          }
      });

      it('should call hashService.generateHash with provided password and return hashed password', async () => {
          jest.spyOn(mockUserHashesService, 'findOneByHash').mockImplementation(async () => mockUserHash);
          const spy = jest.spyOn(mockHashService, 'generateHash').mockImplementation(async () => mockUserHash.hash);
          await usersService.setNewPassword(payload);
          expect(spy).toBeCalledWith(payload.password);
      });

      it('should call usersService.updateOne and userHashesService.removeById concurrently', async () => {
         jest.spyOn(mockUserHashesService, 'findOneByHash').mockImplementation(async () => mockUserHash);
         jest.spyOn(mockHashService, 'generateHash').mockImplementation(async () => mockUserHash.hash);
         const updateSpy = jest.spyOn(usersService, 'updateOne');
         const removeSpy = jest.spyOn(mockUserHashesService, 'removeById');
         await usersService.setNewPassword(payload);
         expect(updateSpy).toBeCalledWith(mockUserHash.userId, { password: mockUserHash.hash });
         expect(removeSpy).toBeCalledWith(mockUserHash.id);
      });
  });

    describe('changePassword', () => {
        const payload: ChangePasswordDto = {
            id: 20,
            oldPassword: 'mark123',
            newPassword: 'alan123',
        };

        beforeEach(() => {
            jest.spyOn(mockUsersRepository, 'updateOneAndFind').mockImplementation(async () => undefined);
            jest.spyOn(mockHashService, 'compareHash').mockImplementation(async () => true)
        });

        it('should call usersRepository.findById with provided userId', async () => {
            const spy = jest.spyOn(mockUsersRepository, 'findById').mockImplementation(async () => mockUser);
            await usersService.changePassword(payload);
            expect(spy).toBeCalledWith(payload.id);
        });

        it('should throw an exception if user is not found', async () => {
            jest.spyOn(mockUsersRepository, 'findById').mockImplementation(async () => undefined);
            try {
                await usersService.changePassword(payload);
                expect(false);
            } catch (e) {
                expect(JSON.stringify(e)).toEqual(JSON.stringify(new RpcException(Messages.USER_NOT_FOUND)));
            }
        });

        it('should throw an exception if user doesn\'t have password', async () => {
            jest.spyOn(mockUsersRepository, 'findById').mockImplementation(async () => mockUserWithoutPassword);
            try {
                await usersService.changePassword(payload);
                expect(false);
            } catch (e) {
                expect(JSON.stringify(e)).toEqual(JSON.stringify(new RpcException(Messages.USER_DOESNT_HAVE_PASSWORD)));
            }
        });

        it('should call hashService.compareHash with provided old password and throw an exception if password doesn\'t match', async () => {
            jest.spyOn(mockUsersRepository, 'findById').mockImplementation(async () => mockUser);
            const spy = jest.spyOn(mockHashService, 'compareHash').mockImplementation(async () => false);
            try {
                await usersService.changePassword(payload);
                expect(false);
            } catch (e) {
                expect(spy).toBeCalledWith(payload.oldPassword, mockUser.password);
                expect(JSON.stringify(e)).toEqual(JSON.stringify(new RpcException(Messages.WRONG_PASSWORD)));
            }

        });

        it('should call hashService.generateHash with provided new password and call usersService.updateOne with userId and new password', async () => {
            jest.spyOn(mockUsersRepository, 'findById').mockImplementation(async () => mockUser);
            const hashSpy = jest.spyOn(mockHashService, 'generateHash').mockImplementation(async () => mockUserHash.hash);
            const updateSpy = jest.spyOn(mockUsersRepository, 'updateOne').mockImplementation(async () => {});

            await usersService.changePassword(payload);
            expect(hashSpy).toBeCalledWith(payload.newPassword);
            expect(updateSpy).toBeCalledWith(payload.id, { password: mockUserHash.hash });
        });
    });

  // describe('createByGoogle', () => {
  //   it('should create new user and return it', async () => {
  //     const payload: GoogleUserData = {
  //       firstName: 'Alan',
  //       lastName: 'Morgan',
  //       email: 'gogunov00@gmail.com',
  //       googleId: '54545454'
  //     };
  //
  //     const result = {
  //       ...new User(),
  //       ...payload,
  //     };
  //
  //     jest.spyOn(mockRepository, 'save').mockImplementation(async () => result);
  //
  //     expect(await usersService.createByGoogle(payload)).toEqual(result);
  //   });
  // });

  // describe('updateOne', () => {
  //   it('should update user and returns it', async () => {
  //     const payload = {
  //       firstName: 'Alan',
  //       lastName: 'Morgan',
  //     };
  //
  //     const result = {
  //       ...new User({}),
  //       id: 5,
  //       firstName: 'Alan',
  //       lastName: 'Morgan',
  //       email: 'gogunov00@gmail.com',
  //       googleId: '54545454',
  //       emailVerified: false,
  //       phoneVerified: false,
  //       online: true,
  //       createdAt: new Date(),
  //     };
  //
  //     jest.spyOn(mockUsersRepository, 'update').mockImplementation(async () => result);
  //     jest.spyOn(mockUsersRepository, 'findOne').mockImplementation(async () => result);
  //
  //     expect(await usersService.updateOne(result.id, payload)).toEqual(result);
  //   });
  // });

  // describe('setNewPassword', () => {
  //   it('should not throw', async () => {
  //     try {
  //       await usersService.updateOne('hash', 'password');
  //       expect(true);
  //     } catch (e) {
  //       expect(false);
  //     }
  //   });
  // });

});