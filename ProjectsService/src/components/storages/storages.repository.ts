import {BaseRepository } from 'astra-common';
import { Storage } from './storage.entity';
import {
    DataSource,
    EntityRepository,
    Transaction,
} from 'typeorm';
import { ProjectsRepository } from '../projects/projects.repository';
import {Project} from "../projects/project.entity";

@EntityRepository(Storage)
export class StoragesRepository extends BaseRepository<Storage> {

    constructor(
        private dataSource: DataSource
    ) {
        super(Storage, dataSource.manager);
    }

    async findById(id: number): Promise<Storage | undefined> {
        return this.findOne({ where: { id } });
    }

    async findManyByProjectId(projectId: number): Promise<Storage[]> {
        return this.find({ where: {  projectId } });
    }

    async findOneByPath(path: string): Promise<Storage | undefined> {
        return this.findOne({ where: {  path } });
    }

    async updateOneAndFind(id: number, data: Partial<Storage>): Promise<Storage | undefined> {
        await this.update({ id }, { ...data });
        return this.findById(id);
    }

    async removeById(id: number): Promise<void> {
        await this.delete({ id });
    }

    async createOne(
      storage: Storage,
      projectId: number,
    ): Promise<Storage> {
        const projectsRepository = new ProjectsRepository(Project, this.dataSource.manager);
        await projectsRepository.incrementStoragesCount(projectId);
        return this.save(storage);
    }
}
