import { Test } from '@nestjs/testing';
import { CoreModule } from '../../core/core.module';
import {mockProject} from './mocks';
import {ProjectsRepository} from '../projects.repository';

describe('ProjectsRepository', () => {
  let projectsRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CoreModule],
      providers: [
          ProjectsRepository,
      ],
    }).compile();

    projectsRepository = module.get<ProjectsRepository>(ProjectsRepository);
  });

  describe('findMany', () => {

  });

  describe('findById', () => {
    const id = 20;
    it('should call projectsRepository.findOne', async () => {
        const spy = jest.spyOn(projectsRepository, 'findOne').mockImplementation(async () => mockProject);
        await projectsRepository.findById(id);
        expect(spy).toBeCalledWith({ id });
    });

    it('should return user', async () => {
        jest.spyOn(projectsRepository, 'findOne').mockImplementation(async () => mockProject);
        expect(await projectsRepository.findById(id)).toEqual(mockProject);
    });
  });

    describe('findOneByClientInfo', () => {
        it('should call projectsRepository.findOneByClientInfo', async () => {
            const spy = jest.spyOn(projectsRepository, 'findOne').mockImplementation(async () => mockProject);
            await projectsRepository.findOneByClientInfo(mockProject.clientId, mockProject.clientSecret);
            expect(spy).toBeCalledWith({ clientId: mockProject.clientId, clientSecret: mockProject.clientSecret });
        });

        it('should return project', async () => {
            jest.spyOn(projectsRepository, 'findOne').mockImplementation(async () => mockProject);
            expect(await projectsRepository.findOneByClientInfo(mockProject.clientId, mockProject.clientSecret)).toEqual(mockProject);
        });
    });

  describe('updateOneAndFind', () => {
        it('should call projectsRepository.update', async () => {
            const spy = jest.spyOn(projectsRepository, 'update').mockImplementation(async () => true);
            jest.spyOn(projectsRepository, 'findById').mockImplementation(async () => mockProject);
            await projectsRepository.updateOneAndFind(mockProject.id, { firstName: 'Markus' });
            expect(spy).toBeCalledWith({ id: mockProject.id }, { firstName: 'Markus' });
        });

        it('should call projectsRepository.findById', async () => {
            jest.spyOn(projectsRepository, 'update').mockImplementation(async () => true);
            const spy = jest.spyOn(projectsRepository, 'findById').mockImplementation(async () => mockProject);
            await projectsRepository.updateOneAndFind(mockProject.id, { firstName: 'Markus' });
            expect(spy).toBeCalledWith(mockProject.id);
        });

        it('should return user', async () => {
            jest.spyOn(projectsRepository, 'update').mockImplementation(async () => true);
            jest.spyOn(projectsRepository, 'findById').mockImplementation(async () => mockProject);
            expect(await projectsRepository.updateOneAndFind({ id: mockProject.id }, { firstName: 'Alan' })).toEqual(mockProject);
        });
  });

  describe('removeById', () => {
        const id = 20;
        it('should call projectsRepository.delete', async () => {
            const spy = jest.spyOn(projectsRepository, 'delete').mockImplementation(async () => mockProject);
            await projectsRepository.removeById(id);
            expect(spy).toBeCalledWith({ id });
        });
  });

    describe('incrementStoragesCount', () => {
        it('should call projectsRepository.increment', async () => {
            jest.spyOn(projectsRepository, 'findById').mockImplementation(async () => mockProject);
            const spy = jest.spyOn(projectsRepository, 'increment').mockImplementation(async () => {});
            await projectsRepository.incrementStoragesCount(mockProject.id);
            expect(spy).toBeCalledWith({ id: mockProject.id }, 'storagesCount', 1);
        });

        it('should call projectsRepository.findById', async () => {
            jest.spyOn(projectsRepository, 'increment').mockImplementation(async () => {});
            const spy = jest.spyOn(projectsRepository, 'findById').mockImplementation(async () => mockProject);
            await projectsRepository.incrementStoragesCount(mockProject.id);
            expect(spy).toBeCalledWith(mockProject.id);
        });

        it('should return project', async () => {
            jest.spyOn(projectsRepository, 'increment').mockImplementation(async () => {});
            jest.spyOn(projectsRepository, 'findById').mockImplementation(async () => mockProject);
            expect(await projectsRepository.incrementStoragesCount(mockProject.id)).toEqual(mockProject);
        });
    });
    describe('decrementStoragesCount', () => {
        it('should call projectsRepository.decrement', async () => {
            jest.spyOn(projectsRepository, 'findById').mockImplementation(async () => mockProject);
            const spy = jest.spyOn(projectsRepository, 'decrement').mockImplementation(async () => {});
            await projectsRepository.decrementStoragesCount(mockProject.id);
            expect(spy).toBeCalledWith({ id: mockProject.id }, 'storagesCount', 1);
        });

        it('should call projectsRepository.findById', async () => {
            jest.spyOn(projectsRepository, 'decrement').mockImplementation(async () => {});
            const spy = jest.spyOn(projectsRepository, 'findById').mockImplementation(async () => mockProject);
            await projectsRepository.decrementStoragesCount(mockProject.id);
            expect(spy).toBeCalledWith(mockProject.id);
        });

        it('should return project', async () => {
            jest.spyOn(projectsRepository, 'decrement').mockImplementation(async () => {});
            jest.spyOn(projectsRepository, 'findById').mockImplementation(async () => mockProject);
            expect(await projectsRepository.decrementStoragesCount(mockProject.id)).toEqual(mockProject);
        });
    });


});