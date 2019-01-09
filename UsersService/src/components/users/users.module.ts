import {Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './user.entity';
import {CoreModule} from '../core/core.module';
import {UsersRepository} from './users.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, UsersRepository]),
        CoreModule
    ],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {}