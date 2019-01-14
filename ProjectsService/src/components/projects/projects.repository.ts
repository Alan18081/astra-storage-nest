import { EntityRepository } from 'typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { User } from '../../../../UsersService/src/components/users/user.entity';

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

  async updateOne(id: number, data: Partial<Project>): Promise<Project | undefined> {
    await this.update({ id }, data);
    return this.findById(id);
  }

  async removeById(id: number): Promise<void> {
    await this.delete({ id });
  }

  async incrementStoragesCount(id: number): Promise<Project | undefined> {
    await this.increment({ id }, 'storagesCount', 1);
    return this.findById(id);
  }

  async decrementStoragesCount(id: number): Promise<Project | undefined> {
      await this.decrement({ id }, 'storagesCount', 1);
      return this.findById(id);
  }

}