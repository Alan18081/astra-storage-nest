import { EntityRepository, Repository } from 'typeorm';
import { UserHash } from './user-hash.entity';

@EntityRepository(UserHash)
export class UserHashesRepository extends Repository<UserHash> {

  async findOneByHash(hash: string): Promise<UserHash | undefined> {
    return this.findOne({ hash });
  }

  async removeById(id: number): Promise<void> {
    await this.delete({ id });
  }
}