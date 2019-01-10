import {BadRequestException, Injectable} from '@nestjs/common';
import { Messages} from '@astra/common';
import {User} from './user.entity';
import {UsersRepository} from './users.repository';
import {HashService} from '@astra/common/services';
import {InjectRepository} from '@nestjs/typeorm';
import { CreateUserDto } from '@astra/common/dto';

@Injectable()
export class UsersService {

    constructor(
       @InjectRepository(UsersRepository)
       private readonly usersRepository: UsersRepository,
       private readonly hashService: HashService,
    ) {}

    async createOne(userData: CreateUserDto): Promise<User> {
        if (await this.usersRepository.findOneByEmail(userData.email)) {
            throw new BadRequestException(Messages.USER_ALREADY_EXISTS);
        }

        const newUser = new User(userData);
        newUser.password = await this.hashService.generateHash(userData.password);
        return await this.usersRepository.save(newUser);
    }

}