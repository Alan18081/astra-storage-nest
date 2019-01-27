import { Test } from '@nestjs/testing';
import { CoreModule } from '../../core/core.module';
import { User } from '../user.entity';
import {UsersRepository} from '../users.repository';
import {mockUser} from './mocks';

describe('UsersRepository', () => {
  let usersRepository;
  const mockUsers = [new User({}), new User({})];

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CoreModule],
      providers: [
          UsersRepository,
      ],
    }).compile();

    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  describe('findById', () => {
    const id = 20;
    it('should call usersRepository.findOne', async () => {
        const spy = jest.spyOn(usersRepository, 'findOne').mockImplementation(async () => mockUser);
        await usersRepository.findById(id);
        expect(spy).toBeCalledWith({ id });
    });

    it('should return user', async () => {
        jest.spyOn(usersRepository, 'findOne').mockImplementation(async () => mockUser);
        expect(await usersRepository.findById(id)).toEqual(mockUser);
    });
  });

  describe('findOneByEmail', () => {
     const email = 'alan@gmail.com';
     it('should call usersRepository.findOne', async () => {
        const spy = jest.spyOn(usersRepository, 'findOne').mockImplementation(async () => mockUser);
        await usersRepository.findOneByEmail(email);
        expect(spy).toBeCalledWith({ email });
     });

     it('should return user', async () => {
        jest.spyOn(usersRepository, 'findOne').mockImplementation(async () => mockUser);
        expect(await usersRepository.findOneByEmail(email)).toEqual(mockUser);
     });

  });

    describe('findOneByGoogleId', () => {
        const googleId = 'fdfdfdfdf';
        it('should call usersRepository.findOneByGoogleId', async () => {
            const spy = jest.spyOn(usersRepository, 'findOne').mockImplementation(async () => mockUser);
            await usersRepository.findOneByGoogleId(googleId);
            expect(spy).toBeCalledWith({ googleId });
        });

        it('should return user', async () => {
            jest.spyOn(usersRepository, 'findOneByGoogleId').mockImplementation(async () => mockUser);
            expect(await usersRepository.findOneByGoogleId(googleId)).toEqual(mockUser);
        });
    });

    describe('updateOneAndFind', () => {
        it('should call usersRepository.update', async () => {
            const spy = jest.spyOn(usersRepository, 'update').mockImplementation(async () => {});
            jest.spyOn(usersRepository, 'findOne').mockImplementation(async () => mockUser);
            await usersRepository.updateOneAndFind(mockUser.id, { firstName: 'Markus' });
            expect(spy).toBeCalledWith({ id: mockUser.id }, { firstName: 'Markus' });
        });

        it('should call usersRepository.findById', async () => {
            jest.spyOn(usersRepository, 'update').mockImplementation(async () => {});
            const spy = jest.spyOn(usersRepository, 'findById').mockImplementation(async () => mockUser);
            await usersRepository.updateOneAndFind(mockUser.id, { firstName: 'Markus' });
            expect(spy).toBeCalledWith(mockUser.id);
        });

        it('should return user', async () => {
            jest.spyOn(usersRepository, 'update').mockImplementation(async () => {});
            jest.spyOn(usersRepository, 'findById').mockImplementation(async () => mockUser);
            expect(await usersRepository.updateOneAndFind(mockUser.id, { firstName: 'Alan' })).toEqual(mockUser);
        });
    });

    describe('updateOne', () => {
        const id = 20;
        const data = {
            firstName: 'Alex',
        };
        it('should call usersRepository.update', async () => {
            const spy = jest.spyOn(usersRepository, 'update').mockImplementation(async () => {});
            await usersRepository.updateOne(id, data);
            expect(spy).toBeCalledWith({ id }, data);
        });
    });

    describe('removeById', () => {
        const id = 20;
        it('should call usersRepository.delete', async () => {
            const spy = jest.spyOn(usersRepository, 'delete').mockImplementation(async () => mockUser);
            await usersRepository.removeById(id);
            expect(spy).toBeCalledWith({ id });
        });
    });

});