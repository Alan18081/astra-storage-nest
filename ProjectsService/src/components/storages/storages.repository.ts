import {BaseRepository } from '@bit/alan18081.astra-storage.common.dist';
import { Storage } from './storage.entity';
import {
  EntityRepository,
  Transaction, TransactionRepository,
} from 'typeorm';
import { ProjectsRepository } from '../projects/projects.repository';

@EntityRepository(Storage)
export class StoragesRepository extends BaseRepository<Storage> {

    async findById(id: number): Promise<Storage | undefined> {
        return this.findOne({ id });
    }

    async findManyByProjectId(projectId: number): Promise<Storage[]> {
        return this.find({ projectId });
    }

    async findOneByPath(path: string): Promise<Storage | undefined> {
        return this.findOne({ path });
    }

    async updateOneAndFind(id: number, data: Partial<Storage>): Promise<Storage | undefined> {
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
        await projectsRepository.incrementStoragesCount(projectId);
        return this.save(storage);
    }
}