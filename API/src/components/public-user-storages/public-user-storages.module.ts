import { Module } from '@nestjs/common';
import {PublicUserStoragesController} from './public-user-storages.controller';
import {AuthModule} from '../auth/auth.module';
import {PublicUserStoragesService} from './public-user-storages.service';

@Module({
    imports: [AuthModule],
    controllers: [PublicUserStoragesController],
    providers: [PublicUserStoragesService],
})
export class PublicUserStoragesModule {}