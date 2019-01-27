import { Test } from '@nestjs/testing';
import {mockProjectAccount, mockProjectAccounts} from './mocks';
import {ProjectAccountsRepository} from '../project-accounts.repository';

describe('ProjectsRepository', () => {
  let projectAccountsRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
          ProjectAccountsRepository,
      ],
    }).compile();

    projectAccountsRepository = module.get<ProjectAccountsRepository>(ProjectAccountsRepository);
  });

  describe('findMany', () => {
      const query = { projectId: 2 };
      it('should call projectAccountsRepository.find', async () => {
          const spy = jest.spyOn(projectAccountsRepository, 'find').mockImplementation(async () => mockProjectAccounts);
          await projectAccountsRepository.findMany(query);
          expect(spy).toBeCalledWith({ ...query, deletedAt: null });
      });

      it('should return array of projects', async () => {
          jest.spyOn(projectAccountsRepository, 'find').mockImplementation(async () => mockProjectAccounts);
          expect(await projectAccountsRepository.findMany(query)).toEqual(mockProjectAccounts);
      });
  });

  describe('findById', () => {
    const id = 20;
    it('should call projectAccountsRepository.findOne', async () => {
        const spy = jest.spyOn(projectAccountsRepository, 'findOne').mockImplementation(async () => mockProjectAccount);
        await projectAccountsRepository.findById(id);
        expect(spy).toBeCalledWith({ id, deletedAt: null });
    });

    it('should return project account', async () => {
        jest.spyOn(projectAccountsRepository, 'findOne').mockImplementation(async () => mockProjectAccount);
        expect(await projectAccountsRepository.findById(id)).toEqual(mockProjectAccount);
    });
  });
  //
  // describe('updateOneAndFind', () => {
  //       it('should call projectAccountsRepository.updateOne', async () => {
  //           const spy = jest.spyOn(projectAccountsRepository, 'update').mockImplementation(async () => {});
  //           jest.spyOn(projectAccountsRepository, 'findOne').mockImplementation(async () => mockProjectAccount);
  //           await projectAccountsRepository.updateOneAndFind(mockProjectAccount.id, { firstName: 'Markus' });
  //           expect(spy).toBeCalledWith({ id: mockProjectAccount.id }, { firstName: 'Markus' });
  //       });
  //
  //       it('should call projectAccountsRepository.findById', async () => {
  //           jest.spyOn(projectAccountsRepository, 'update').mockImplementation(async () => {});
  //           const spy = jest.spyOn(projectAccountsRepository, 'findById').mockImplementation(async () => mockProjectAccount);
  //           await projectAccountsRepository.updateOneAndFind({ id: mockProjectAccount.id }, { firstName: 'Markus' });
  //           expect(spy).toBeCalledWith({ id: mockProjectAccount.id });
  //       });
  //
  //       it('should return project account', async () => {
  //           jest.spyOn(projectAccountsRepository, 'update').mockImplementation(async () => {});
  //           jest.spyOn(projectAccountsRepository, 'findById').mockImplementation(async () => mockProjectAccount);
  //           expect(await projectAccountsRepository.updateOneAndFind({ id: mockProjectAccount.id }, { firstName: 'Alan' })).toEqual(mockProjectAccount);
  //       });
  // });

  describe('removeById', () => {
        const id = 20;
        it('should call projectAccountsRepository.delete', async () => {
            const spy = jest.spyOn(projectAccountsRepository, 'update').mockImplementation(async () => mockProjectAccount);
            await projectAccountsRepository.removeById(id);
            expect(spy).toBeCalledWith({ id }, { deletedAt: new Date() });
        });
  });

});