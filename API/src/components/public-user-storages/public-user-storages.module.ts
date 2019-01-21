import { Module } from '@nestjs/common';
import {PublicUserStoragesController} from './public-user-storages.controller';
import {AuthModule} from '../auth/auth.module';
import {PublicUserStoragesService} from './public-user-storages.service';
import {StoragesModule} from '../storages/storages.module';

@Module({
    imports: [AuthModule, StoragesModule],
    controllers: [PublicUserStoragesController],
    providers: [PublicUserStoragesService],
})
export class PublicUserStoragesModule {}