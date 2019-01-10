import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoragesController } from './storages.controller';
import { StoragesService } from './storages.service';
import {StoragesRepository} from './storages.repository';
import {ProjectsModule} from '../projects/projects.module';
import { Storage } from './storage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Storage, StoragesRepository]),
    ProjectsModule,
  ],
  controllers: [StoragesController],
  providers: [StoragesService],
})
export class StoragesModule {}