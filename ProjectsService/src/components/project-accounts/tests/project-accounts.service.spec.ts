import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
    mockProjectAccount, mockProjectAccounts, mockProjectAccountsRepository,
} from './mocks';
import {
    FindProjectDto,
    RemoveProjectDto,
    CreateProjectAccountDto,
} from '@bit/alan18081.astra-storage.common.dist/dto';
import {ProjectAccountsService} from '../project-accounts.service';
import {ProjectsService} from '../../projects/projects.service';
import {ProjectAccountsRepository} from '../project-accounts.repository';
import {Messages} from '@bit/alan18081.astra-storage.common.dist/enums';
import {RpcException} from '@nestjs/microservices';
import {mockHashService, mockProject} from '../../projects/tests/mocks';
import {mockProjectsService} from '../../storages/tests/mocks';
import {HashService} from '@bit/alan18081.astra-storage.common.dist/services';

describe('ProjectsService', () => {
  let projectAccountsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
          ProjectAccountsService,
          { provide: getRepositoryToken(ProjectAccountsRepository), useValue: mockProjectAccountsRepository },
          { provide: ProjectsService, useValue: mockProjectsService },
          { provide: HashService, useValue: mockHashService },
      ],
    }).compile();

    projectAccountsService = module.get<ProjectAccountsService>(ProjectAccountsService);
  });

    describe('findManyByProject', () => {
        const payload = {
            userId: 5,
            projectId: 7,
        };

        it('should call projectAccountsRepository.findMany if page and limit are not provided', async () => {
            jest.spyOn(mockProjectsService, 'findOneByUserId').mockImplementation(async () => ({}));
            const spy = jest.spyOn(mockProjectAccountsRepository, 'findMany').mockImplementation(async () => []);
            await projectAccountsService.findMany(payload);
            expect(spy).toBeCalledWith({ projectId: payload.projectId });
        });

        it('should call projectAccountsRepository.findManyWithPagination if page and limit are provided', async () => {
            jest.spyOn(mockProjectsService, 'findOneByUserId').mockImplementation(async () => ({}));
            const spy = jest.spyOn(mockProjectAccountsRepository, 'findManyWithPagination').mockImplementation(async () => []);
            await projectAccountsService.findMany({...payload, page: 2, limit: 10});
            expect(spy).toBeCalledWith({ projectId: payload.projectId }, { page: 2, limit: 10 });
        });

        it('should return array of project-accounts', async () => {
            jest.spyOn(mockProjectsService, 'findById').mockImplementation(async () => ({}));
            jest.spyOn(mockProjectAccountsRepository, 'findMany').mockImplementation(async () => mockProjectAccounts);
            expect(await projectAccountsService.findMany(payload.projectId)).toEqual(mockProjectAccounts);
        });
    });

  describe('findById', () => {
    const payload: FindProjectDto = {
        id: 20,
        userId: 5,
    };
    it('should call projectsRepository.findById', async () => {
        const spy = jest.spyOn(mockProjectAccountsRepository, 'findById').mockImplementation(async () => mockProjectAccount);
        await projectAccountsService.findById(payload.id);
        expect(spy).toBeCalledWith(payload.id);
    });

    it('should return project account', async () => {
        jest.spyOn(mockProjectAccountsRepository, 'findById').mockImplementation(async () => mockProjectAccount);
        expect(await projectAccountsService.findById(payload)).toEqual(mockProjectAccount);
    });
  });

    describe('removeById', () => {
        const payload: RemoveProjectDto = {
            id: 20,
            userId: 5,
        };
        it('should call projectsRepository.removeById', async () => {
            const spy = jest.spyOn(mockProjectAccountsRepository, 'removeById').mockImplementation(async () => mockProjectAccount);
            await projectAccountsService.removeById(payload.id);
            expect(spy).toBeCalledWith(payload.id);
        });
    });

    describe('findOneByEmail', () => {
        const payload = {
            email: 'alan@gmail.com',
            projectId: 3,
        };
        it('should call projectAccountsRepository.findOneByEmail', async () => {
            const spy = jest.spyOn(mockProjectAccountsRepository, 'findOneByEmail').mockImplementation(async () => mockProjectAccount);
            await projectAccountsService.findOneByEmail(payload);
            expect(spy).toBeCalledWith(payload.email, payload.projectId);
        });

        it('should return project account', async () => {
            jest.spyOn(mockProjectAccountsRepository, 'findOneByEmail').mockImplementation(async () => mockProjectAccount);
            expect(await projectAccountsService.findOneByEmail(payload)).toEqual(mockProjectAccount);
        });
    });

  describe('createOne', () => {
    const payload: CreateProjectAccountDto = {
       login: mockProjectAccount.login,
       email: mockProjectAccount.email,
       password: mockProjectAccount.password,
       projectId: mockProjectAccount.projectId,
       ownerId: mockProjectAccount.ownerId,
    };

    it('should call findOneByEmail', async () => {
        const spy = jest.spyOn(mockProjectAccountsRepository, 'findOneByEmail').mockImplementation(async () => {});
        await projectAccountsService.createOne(payload);
        expect(spy).toBeCalledWith(payload.email, payload.projectId);
    });

      it('should throw an exception if account with provided email already exists',  async () => {
          jest.spyOn(mockProjectAccountsRepository, 'findOneByEmail').mockImplementation(async () => mockProjectAccount);
          try {
              await projectAccountsService.createOne(payload);
              expect(false);
          } catch (e) {
              expect(JSON.stringify(e)).toEqual(JSON.stringify(new RpcException(Messages.USER_ALREADY_EXISTS)));
          }
      });

    it('should create new project account and return it', async () => {
       jest.spyOn(mockProjectAccountsRepository, 'findOneByEmail').mockImplementation(async () => undefined);
       jest.spyOn(mockProjectAccountsRepository, 'save').mockImplementation(async () => mockProjectAccount);
       expect(await projectAccountsService.createOne(payload)).toEqual(mockProjectAccount);
    });
  });

});