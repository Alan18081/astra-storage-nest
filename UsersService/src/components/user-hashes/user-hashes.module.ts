import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '../core/core.module';
import { UserHashesService } from './user-hashes.service';
import { UserHash } from './user-hash.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserHash]),
    CoreModule,
  ],
  providers: [UserHashesService],
  exports: [UserHashesService],
})
export class UserHashesModule {}