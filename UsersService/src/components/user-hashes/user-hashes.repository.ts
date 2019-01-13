import { EntityRepository, Repository } from 'typeorm';
import { UserHash } from './user-hash.entity';

@EntityRepository(UserHash)
export class UserHashesRepository extends Repository<UserHash> {

  async findOneByHash(hash: string): Promise<UserHash | undefined> {
    return await super.findOne({ hash });
  }

}