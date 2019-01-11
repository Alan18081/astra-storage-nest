import { PaginatedResponse, StorageType } from '@astra/common';
import { Storage } from './storage.entity';
import {
  EntityRepository,
  FindManyOptions,
  Repository,
  Transaction, TransactionRepository,
} from 'typeorm';
import { FindStoragesListDto, PaginationDto } from '@astra/common/dto';
import { ProjectsRepository } from '../projects/projects.repository';

@EntityRepository(Storage)
export class StoragesRepository extends Repository<Storage> {

    async findById(id: number): Promise<Storage | undefined> {
        return this.findOne({ id });
    }

    async findManyByProjectId(projectId: number): Promise<Storage[]> {
        return this.find({ projectId });
    }

    async findOneByPath(path: string): Promise<Storage | undefined> {
        return this.findOne({ path });
    }

    async findOneByName(name: string): Promise<Storage | undefined> {
        return await this.findOne({ name });
    }

    async updateOne(id: number, data: Partial<Storage>): Promise<Storage | undefined> {
        await this.update({ id }, { ...data });
        return this.findById(id);
    }

    async removeById(id: number): Promise<void> {
        await this.delete({ id });
    }

    @Transaction()
    async createOne(
      storage: Storage,
      projectId: number,
      @TransactionRepository()
      storagesRepository?: StoragesRepository,
      @TransactionRepository()
      projectsRepository?: ProjectsRepository,
    ): Promise<Storage> {
        const savedStorage = await this.save(storage);
        await projectsRepository.incrementStoragesCount(projectId);
        return savedStorage;
    }
}