import {Module} from '@nestjs/common';
import {UsersController} from './users.controller';
import {UsersService} from './users.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './user.entity';
import {CoreModule} from '../core/core.module';
import {UsersRepository} from './users.repository';
import {UserHashesModule} from '../user-hashes/user-hashes.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, UsersRepository]),
        CoreModule,
        UserHashesModule,
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}