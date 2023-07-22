import {EntityRepository, FindOptionsWhere} from 'typeorm';
import { ProjectAccount } from './project-account.entity';
import { BaseRepository, PaginatedResponse } from 'astra-common';
import { PaginationDto } from 'astra-common';

@EntityRepository(ProjectAccount)
export class ProjectAccountsRepository extends BaseRepository<ProjectAccount> {

  async findMany(query: Partial<ProjectAccount>): Promise<ProjectAccount[]> {
    return super.find({ where: { ...query, deletedAt: null } });
  }

  async findById(id: number): Promise<ProjectAccount | undefined> {
    return super.findOne({ where: {  id, deletedAt: null } });
  }

  async findManyWithPagination(query: FindOptionsWhere<ProjectAccount>, pagination: Required<PaginationDto>): Promise<PaginatedResponse<ProjectAccount>> {
    return super.findManyWithPagination(query, pagination);
  }

  async findOneByEmail(email: string, projectId: number): Promise<ProjectAccount | undefined> {
    return super.findOne({ where: { email, projectId, deletedAt: null } });
  }

  async removeById(id: number): Promise<void> {
    await super.update({ id }, { deletedAt: new Date() });
  }
}
