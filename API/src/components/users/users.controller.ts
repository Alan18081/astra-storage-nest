import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseFilters, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiUseTags} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { IUser } from '../../../../Common/src/entities';
import {CreateUserDto, FindUsersListDto} from '@astra/common/dto';
import {ApiExceptionFilter} from '../../helpers/filters/api.filter';

@Controller('users')
@UseFilters(ApiExceptionFilter)
@ApiUseTags('Users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Get('')
  @ApiOperation({ title: 'Find list of users' })
  findMany(@Query() dto: FindUsersListDto): Promise<IUser[]> {
    return this.usersService.findMany(dto);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Find user by id' })
  findOne(@Param('id') id: number): Promise<IUser | undefined> {
    return this.usersService.findOne({ id });
  }

  @Post('')
  @ApiOperation({ title: 'Create new user' })
  createOne(@Body() dto: CreateUserDto): Promise<IUser> {
    return this.usersService.createOne(dto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Update user by id' })
  updateOne(@Param('id') id: number, @Body() dto: any): Promise<IUser | undefined> {
    return this.usersService.updateOne({ id, ...dto });
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Delete user by id' })
  async removeOne(@Param('id') id: number): Promise<void> {
    await this.usersService.removeOne({ id });
  }

}
