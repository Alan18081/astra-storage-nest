import { Module } from '@nestjs/common';
import { UsersModule } from './components/users/users.module';
import { AuthModule } from './components/auth/auth.module';
import {ProjectsModule} from './components/projects/projects.module';
import {StoragesModule} from './components/storages/storages.module';
import {PublicUserStoragesModule} from './components/public-user-storages/public-user-storages.module';
import {ProtectedUserStoragesModule} from './components/protected-user-storages/protected-user-storages.module';
import {StorageRecordsModule} from './components/storage-records/storage-records.module';
import {ProjectAccountsModule} from './components/project-accounts/project-accounts.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ProjectsModule,
    ProjectAccountsModule,
    StoragesModule,
    PublicUserStoragesModule,
    ProtectedUserStoragesModule,
    StorageRecordsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
