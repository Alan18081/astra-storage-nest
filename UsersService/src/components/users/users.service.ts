import {Injectable} from '@nestjs/common';
import { Messages} from '@astra/common';
import {User} from './user.entity';
import {UsersRepository} from './users.repository';
import {HashService} from '@astra/common/services';
import {InjectRepository} from '@nestjs/typeorm';
import { CreateUserDto } from '@astra/common/dto';
import {RpcException} from '@nestjs/microservices';

@Injectable()
export class UsersService {

    constructor(
       @InjectRepository(UsersRepository)
       private readonly usersRepository: UsersRepository,
       private readonly hashService: HashService,
    ) {}

    async findMany(): Promise<User[]> {
        return this.usersRepository.find({});
    }

    async findById(id: number): Promise<User | undefined> {
        return this.usersRepository.findById(id);
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        return this.usersRepository.findOneByEmail(email);
    }

    async updateOne(id: number, data: Partial<User>): Promise<User | undefined> {
        return this.usersRepository.updateOne(id, data);
    }

    async createOne(userData: CreateUserDto): Promise<User> {
        if (await this.usersRepository.findOneByEmail(userData.email)) {
            throw new RpcException(Messages.USER_ALREADY_EXISTS);
        }

        const newUser = new User(userData);
        newUser.password = await this.hashService.generateHash(userData.password);
        return await this.usersRepository.save(newUser);
    }

    async removeById(id: number): Promise<void> {
        await this.usersRepository.removeOne(id);
    }

}