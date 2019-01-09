import {ClassSerializerInterceptor, Controller, UseInterceptors} from '@nestjs/common';
import {MessagePattern} from '@nestjs/microservices';
import {
    CommunicationCodes,
    CreateUserDto,
    FindUserByEmailDto,
    FindUserDto,
    FindUsersListDto,
    Messages, RemoveUserDto, UpdateUserDto
} from '@astra/common';
import {User} from './user.entity';
import {UsersService} from './users.service';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {

    constructor(
       private readonly usersService: UsersService
    ) {}

    @MessagePattern({ cmd: CommunicationCodes.GET_USERS_LIST })
    async findMany(dto: FindUsersListDto): Promise<User[]> {

        return await this.usersService.findMany(dto);
    }

    @MessagePattern({ cmd: CommunicationCodes.GET_USER })
    async findOne(dto: FindUserDto): Promise<User | undefined> {

        return await this.usersService.findOneById(dto.id);
    }

    @MessagePattern({ cmd: CommunicationCodes.GET_USER_BY_EMAIL })
    async findOneByEmail(dto: FindUserByEmailDto): Promise<User | undefined> {
        return await this.usersService.findOneByEmail(dto.email);
    }

    @MessagePattern({ cmd: CommunicationCodes.CREATE_USER })
    async createOne(dto: CreateUserDto): Promise<User> {
        return await this.usersService.createOne(dto);
    }

    @MessagePattern({ cmd: CommunicationCodes.UPDATE_USER })
    async updateOne(dto: UpdateUserDto): Promise<User | undefined> {
        return await this.usersService.updateOne(dto);
    }

    @MessagePattern({ cmd: CommunicationCodes.REMOVE_USER} )
    async removeOne(dto: RemoveUserDto): Promise<void> {
        await this.usersService.removeOne(dto.id);
    }

}