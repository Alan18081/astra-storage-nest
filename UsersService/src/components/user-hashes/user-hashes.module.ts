import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '../core/core.module';
import { UserHashesService } from './user-hashes.service';
import { UserHash } from './user-hash.entity';
import { UserHashesRepository } from './user-hashes.repository';
import { UserHashesController } from './user-hashes.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserHash, UserHashesRepository]),
    CoreModule,
  ],
  controllers: [UserHashesController],
  providers: [UserHashesService],
  exports: [UserHashesService],
})
export class UserHashesModule {}