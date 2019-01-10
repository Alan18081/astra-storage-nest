import {ClassSerializerInterceptor, Controller, UseInterceptors} from '@nestjs/common';
import {MessagePattern} from '@nestjs/microservices';
import {
    CommunicationCodes,
    Messages,
} from '@astra/common';
import {
  CreateUserDto,
  FindUserByEmailDto,
  FindUserDto,
  FindUsersListDto,
  RemoveUserDto,
  UpdateUserDto,
} from '@astra/common/dto';
import {User} from './user.entity';
import {UsersService} from './users.service';
import { UsersRepository } from './users.repository';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {

    constructor(
       private readonly usersService: UsersService,
       private readonly usersRepository: UsersRepository,
    ) {}

    @MessagePattern({ cmd: CommunicationCodes.GET_USERS_LIST })
    async findMany(dto: FindUsersListDto): Promise<User[]> {

        return await this.usersRepository.find({});
    }

    @MessagePattern({ cmd: CommunicationCodes.GET_USER })
    async findOne(dto: FindUserDto): Promise<User | undefined> {
        return await this.usersRepository.findById(dto.id);
    }

    @MessagePattern({ cmd: CommunicationCodes.GET_USER_BY_EMAIL })
    async findOneByEmail(dto: FindUserByEmailDto): Promise<User | undefined> {
        return await this.usersRepository.findOneByEmail(dto.email);
    }

    @MessagePattern({ cmd: CommunicationCodes.CREATE_USER })
    async createOne(dto: CreateUserDto): Promise<User> {
        return await this.usersService.createOne(dto);
    }

    @MessagePattern({ cmd: CommunicationCodes.UPDATE_USER })
    async updateOne(dto: UpdateUserDto): Promise<User | undefined> {
        return await this.usersRepository.updateOne(dto.id, dto);
    }

    @MessagePattern({ cmd: CommunicationCodes.REMOVE_USER} )
    async removeOne(dto: RemoveUserDto): Promise<void> {
        await this.usersRepository.removeOne(dto.id);
    }

}