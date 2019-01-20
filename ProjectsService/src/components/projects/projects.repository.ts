import { EntityRepository } from 'typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { User } from '../../../../UsersService/src/components/users/user.entity';
import {FindProjectDto} from '@astra/common/dto';

@EntityRepository(Project)
export class ProjectsRepository extends Repository<Project> {

  async findManyByUser(userId: number): Promise<Project[]> {
    return this.find({ userId });
  }

  async findOneByUserId(id: number, userId: number): Promise<Project | undefined> {
    return this.findOne({ id, userId });
  }

  async findById(id: number, userId: number): Promise<Project | undefined> {
    return this.findOne({ id, userId });
  }

  async findOneByClientInfo(clientId: string, clientSecret: string): Promise<Project | undefined> {
    return this.findOne({ clientId, clientSecret });
  }

  async updateOne(filter: FindProjectDto, data: Partial<Project>): Promise<Project | undefined> {
    await this.update(filter, data);
    return this.findById(filter.id, filter.userId);
  }

  async removeById(id: number): Promise<void> {
    await this.delete({ id });
  }

  async incrementStoragesCount(id: number, userId: number): Promise<Project | undefined> {
    await this.increment({ id, userId }, 'storagesCount', 1);
    return this.findById(id, userId);
  }

  async decrementStoragesCount(id: number, userId: number): Promise<Project | undefined> {
      await this.decrement({ id, userId }, 'storagesCount', 1);
      return this.findById(id, userId);
  }

}