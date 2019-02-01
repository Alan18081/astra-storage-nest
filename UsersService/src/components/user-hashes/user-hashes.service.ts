import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserHash } from './user-hash.entity';
import { HashService } from '@bit/alan18081.astra-storage.common.dist/services';
import { UserHashesRepository } from './user-hashes.repository';
import { HashTypes } from '@bit/alan18081.astra-storage.common.dist';

@Injectable()
export class UserHashesService {

  constructor(
    private readonly hashService: HashService,
    @InjectRepository(UserHashesRepository)
    private readonly userHashesRepository: UserHashesRepository,
  ) {}

  async findOneByHash(hash: string): Promise<UserHash | undefined> {
    return this.userHashesRepository.findOneByHash(hash);
  }

  async createOne(userId: number, type: HashTypes): Promise<UserHash> {
    const userHash = new UserHash({
        userId,
    });
    userHash.hash = await this.hashService.generateHash(JSON.stringify({ userId, type }));

    return await this.userHashesRepository.save(userHash);
  }

  async verifyResetPasswordHash(hash: string): Promise<boolean> {
    return !!this.userHashesRepository.findOneByHash(hash);
  }

  async removeById(id: number): Promise<void> {
    await this.userHashesRepository.removeById(id);
  }

}