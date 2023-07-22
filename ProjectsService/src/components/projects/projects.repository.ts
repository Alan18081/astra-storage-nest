import { EntityRepository } from 'typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@EntityRepository(Project)
export class ProjectsRepository extends Repository<Project> {

  async findManyByUser(userId: number): Promise<Project[]> {
    return this.find({ where: { userId } });
  }

  async findOneByUserId(id: number, userId: number): Promise<Project | undefined> {
    return this.findOne({ where: { id, userId } });
  }

  async findById(id: number): Promise<Project | undefined> {
    return this.findOne({ where: { id } });
  }

  async findOneByClientInfo(clientId: string, clientSecret: string): Promise<Project | undefined> {
    return this.findOne({ where: {  clientId, clientSecret } });
  }

  async updateOneAndFind(id: number, data: Partial<Project>): Promise<Project | undefined> {
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
