import { Module } from '@nestjs/common';
import {ProtectedUserStoragesController} from './protected-user-storages.controller';
import {AuthModule} from '../auth/auth.module';
import {ProtectedUserStoragesService} from './protected-user-storages.service';

@Module({
    imports: [AuthModule],
    controllers: [ProtectedUserStoragesController],
    providers: [ProtectedUserStoragesService],
})
export class ProtectedUserStoragesModule {}
