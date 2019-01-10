import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '../core/core.module';
import { UserHashesService } from './user-hashes.service';
import { UserHash } from './user-hash.entity';
import { UserHashesRepository } from './user-hashes.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserHash, UserHashesRepository]),
    CoreModule,
  ],
  providers: [UserHashesService],
  exports: [UserHashesService],
})
export class UserHashesModule {}