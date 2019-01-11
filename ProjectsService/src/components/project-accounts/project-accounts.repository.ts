import { EntityRepository, FindManyOptions, Repository } from 'typeorm';
import { ProjectAccount } from './project-account.entity';
import { BaseRepository, PaginatedResponse } from '@astra/common';
import { PaginationDto } from '@astra/common/dto';

@EntityRepository(ProjectAccount)
export class ProjectAccountsRepository extends BaseRepository<ProjectAccount> {

  async findMany(query: Partial<ProjectAccount>): Promise<ProjectAccount[]> {
    return this.find({ ...query, deletedAt: null });
  }

  async findManyWithPagination(query: FindManyOptions<ProjectAccount>, pagination: Required<PaginationDto>): Promise<PaginatedResponse<ProjectAccount>> {
    return super.findManyWithPagination(query, pagination);
  }

  async findOneByEmail(email: string): Promise<ProjectAccount | undefined> {
    return this.findOne({ email, deletedAt: null });
  }

  async removeOne(id: number): Promise<void> {
    await this.update({ id }, { deletedAt: new Date() });
  }
}