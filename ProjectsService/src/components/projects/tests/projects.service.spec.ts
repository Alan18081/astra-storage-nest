import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CoreModule } from '../../core/core.module';
import {
    mockProject, mockProjects,
    mockProjectsRepository,
} from './mocks';
import {ProjectsService} from '../projects.service';
import {ProjectsRepository} from '../projects.repository';
import {
    FindProjectDto,
    FindProjectByClientInfoDto,
    UpdateProjectDto,
    RemoveProjectDto,
    CreateProjectDto,
} from '@astra/common/dto';

describe('ProjectsService', () => {
  let projectsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CoreModule],
      providers: [
          ProjectsService,
          { provide: getRepositoryToken(ProjectsRepository), useValue: mockProjectsRepository },
      ],
    }).compile();

    projectsService = module.get<ProjectsService>(ProjectsService);
  });

  describe('findManyByUser', () => {
    const userId = 20;
    it('should call projectsRepository.findManyByUser', async () => {
        const spy = jest.spyOn(mockProjectsRepository, 'findManyByUser').mockImplementation(async () => []);
        await projectsService.findManyByUser(userId);
        expect(spy).toBeCalledWith(userId);
    });

      it('should return array of project', async () => {
          jest.spyOn(mockProjectsRepository, 'findManyByUser').mockImplementation(async () => mockProjects);
          expect(await projectsService.findManyByUser(userId)).toEqual(mockProjects);
      });
  });

  describe('findById', () => {
    const payload: FindProjectDto = {
        id: 20,
        userId: 5,
    };
    it('should call projectsRepository.findById', async () => {
        const spy = jest.spyOn(mockProjectsRepository, 'findById').mockImplementation(async () => mockProject);
        await projectsService.findById(payload.id);
        expect(spy).toBeCalledWith(payload.id);
    });

    it('should return project', async () => {
        jest.spyOn(mockProjectsRepository, 'findOneByUserId').mockImplementation(async () => mockProject);
        expect(await projectsService.findById(payload)).toEqual(mockProject);
    });
  });

    describe('findOneByUserId', () => {
        const id = 20;
        const userId = 30;
        it('should call projectsRepository.findOneByUserId', async () => {
            const spy = jest.spyOn(mockProjectsRepository, 'findOneByUserId').mockImplementation(async () => mockProject);
            await projectsService.findOneByUserId(id, userId);
            expect(spy).toBeCalledWith(id, userId);
        });

        it('should return project', async () => {
            jest.spyOn(mockProjectsRepository, 'findOneByUserId').mockImplementation(async () => mockProject);
            expect(await projectsService.findOneByUserId(id, userId)).toEqual(mockProject);
        });
    });

    describe('findOneByClientInfo', () => {
        const payload: FindProjectByClientInfoDto = {
            clientId: 'some id',
            clientSecret: 'some secret',
        };
        it('should call projectsRepository.findOneByClientInfo', async () => {
            const spy = jest.spyOn(mockProjectsRepository, 'findOneByClientInfo').mockImplementation(async () => mockProject);
            await projectsService.findOneByClientInfo(payload);
            expect(spy).toBeCalledWith(payload.clientId, payload.clientSecret);
        });

        it('should return project', async () => {
            jest.spyOn(mockProjectsRepository, 'findById').mockImplementation(async () => mockProject);
            expect(await projectsService.findById(payload)).toEqual(mockProject);
        });
    });

    describe('updateOne', () => {
        const payload: UpdateProjectDto = {
            id: 20,
            userId: 30,
            name: 'Alex',
        };
        const { id, ...data } = payload;
        it('should call projectsRepository.updateOne', async () => {
            const spy = jest.spyOn(mockProjectsRepository, 'updateOneAndFind').mockImplementation(async () => mockProject);
            await projectsService.updateOne(payload);
            expect(spy).toBeCalledWith(id, { ...data });
        });

        it('should return updated project', async () => {
            jest.spyOn(mockProjectsRepository, 'updateOneAndFind').mockImplementation(async () => mockProject);
            expect(await projectsService.updateOne(payload)).toEqual(mockProject);
        });
    });

    describe('removeById', () => {
        const payload: RemoveProjectDto = {
            id: 20,
            userId: 5,
        };
        it('should call projectsRepository.removeById', async () => {
            const spy = jest.spyOn(mockProjectsRepository, 'removeById').mockImplementation(async () => mockProject);
            await projectsService.removeById(payload.id, payload.userId);
            expect(spy).toBeCalledWith(payload.id, payload.userId);
        });
    });

  describe('createOne', () => {
    const payload: CreateProjectDto = {
       userId: mockProject.userId,
       name: mockProject.name,
       description: mockProject.description,
    };

    it('should create new project and return it', async () => {
       projectsService.randomGenerator = () => {};
       jest.spyOn(projectsService, 'randomGenerator').mockImplementation(() => mockProject.clientId);
       jest.spyOn(mockProjectsRepository, 'save').mockImplementation(async () => mockProject);

       expect(await projectsService.createOne(payload)).toEqual(mockProject);
    });
  });

  describe('isValidOwner', () => {
      it('should call projectsRepository.findOneByUserId', async () => {
         const spy = jest.spyOn(mockProjectsRepository, 'findOneByUserId').mockImplementation(async () => mockProject);
         await projectsService.isValidOwner(mockProject.id, mockProject.userId);
         expect(spy).toBeCalledWith(mockProject.id, mockProject.userId);
      });

      it('should return true if project is found', async () => {
          jest.spyOn(mockProjectsRepository, 'findOneByUserId').mockImplementation(async () => mockProject);
          expect(await projectsService.isValidOwner(mockProject.id, mockProject.userId)).toEqual(true);
      });
  });

});