import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserHash } from './user-hash.entity';
import { HashService } from '@astra/common/services';
import { UserHashesRepository } from './user-hashes.repository';
import { HashTypes } from '@astra/common';

@Injectable()
export class UserHashesService {

  constructor(
    @InjectRepository(UserHashesRepository)
    private readonly userHashesRepository: UserHashesRepository,
    private readonly hashService: HashService,
  ) {}
  async createOne(userId: number, type: HashTypes): Promise<UserHash> {
    const userHash = new UserHash();
    userHash.hash = await this.hashService.generateHash(JSON.stringify({ userId, type }));
    userHash.userId = userId;

    return await this.userHashesRepository.save(userHash);
  }

}