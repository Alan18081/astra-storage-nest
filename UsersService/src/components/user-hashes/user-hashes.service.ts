import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserHash } from './user-hash.entity';
import { Repository } from 'typeorm';
import { HashTypes } from '../../helpers/enums/hash-types.enum';
import { HashService } from '../core/services/hash.service';

@Injectable()
export class UserHashesService {

  constructor(
    @InjectRepository(UserHash)
    private readonly userHashesRepository: Repository<UserHash>,
    private readonly hashService: HashService,
  ) {}

  async findOneByHash(hash: string): Promise<UserHash | undefined> {
    return await this.userHashesRepository.findOne({ hash });
  }

  async createOne(userId: number, type: HashTypes): Promise<UserHash> {
    const userHash = new UserHash();
    userHash.hash = await this.hashService.generateHash(JSON.stringify({ userId, type }));
    userHash.userId = userId;

    return await this.userHashesRepository.save(userHash);
  }

  async deleteOne(id: number): Promise<void> {
    await this.userHashesRepository.delete({ id });
  }

}