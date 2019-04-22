import { Module } from '@nestjs/common';
// import { UsersServiceOld } from './users.service.old';
import { UsersController } from './users.controller';

@Module({
    imports: [],
    controllers: [UsersController],
    // providers: [UsersServiceOld],
    // exports: [UsersServiceOld]
})
export class UsersModule {}