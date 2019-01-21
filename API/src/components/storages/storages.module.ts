import { Module } from '@nestjs/common';
import {StoragesController} from './storages.controller';
import {AuthModule} from '../auth/auth.module';
import {StoragesService} from './storages.service';

@Module({
    imports: [AuthModule],
    controllers: [StoragesController],
    providers: [StoragesService],
    exports: [StoragesService],
})
export class StoragesModule {}