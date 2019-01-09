import {BadRequestException, Injectable} from '@nestjs/common';
import {CreateUserDto, FindUsersListDto, Messages, UpdateUserDto} from '@astra/common';
import {User} from './user.entity';
import {UsersRepository} from './users.repository';
import {HashService} from '@astra/common/services';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class UsersService {

    constructor(
       @InjectRepository(UsersRepository)
       private readonly usersRepository: UsersRepository,
       private readonly hashService: HashService
    ) {}

    async findMany(dto: FindUsersListDto): Promise<User[]> {
        return await this.usersRepository.find({});
    }

    async findOneById(id: number): Promise<User | undefined> {
        return await this.usersRepository.findById(id);
    }

    async findOneByEmail(email: string): Promise<User | undefined> {
        return await this.usersRepository.findOneByEmail(email);
    }

    async createOne(userData: CreateUserDto): Promise<User> {
        const user = await this.usersRepository.findOneByEmail(userData.email);

        if(user) {
            throw new BadRequestException(Messages.USER_ALREADY_EXISTS);
        }

        const newUser = new User(userData);
        newUser.password = await this.hashService.generateHash(userData.password);
        return await this.usersRepository.save(newUser);
    }

    async updateOne(dto: UpdateUserDto) {
        const { id, ...payload } = dto;

        await this.usersRepository.updateOne(id, payload);
        return this.usersRepository.findById(id);
    }

    async removeOne(id: number): Promise<void> {
        await this.usersRepository.delete({ id });
    }

}